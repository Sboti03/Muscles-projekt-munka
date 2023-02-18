import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from '../types/jwt-payload';
import { Tokens } from '../types/token';
import { UserGetService } from '../../user/services/user-get/user-get.service';
import { compareData } from '../../utils/bcrypt';
import LoginDto from '../dto/login.dto';
import { UserUpdateService } from '../../user/services/user-update/user-update.service';
import { CreateUserDTO } from '../../user/dto/createUserDTO';
import { UserCheckService } from '../../user/services/user-check/user-check.service';
import { UserCreateService } from '../../user/services/user-create/user-create.service';
import { UserDeleteService } from '../../user/services/user-delete/user-delete.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userGetService: UserGetService,
        private userUpdateService: UserUpdateService,
        private userCheckService: UserCheckService,
        private userCreateService: UserCreateService,
        private userDeleteService: UserDeleteService,
    ) {}

    async validateUser(loginDto: LoginDto) {
        const user = await this.userGetService.getUserByEmail(loginDto.email);
        if (!user) throw new ForbiddenException('No user found');

        const passMatch: boolean = compareData(
            loginDto.password,
            user.password,
        );
        if (!passMatch) throw new ForbiddenException('Access Denied');

        const { password, refreshTokens, ...rest } = user;
        const tokens = await this.getTokens(user.userId);
        await this.userUpdateService.pushNewRefreshToken(
            tokens.refreshToken,
            user.userId,
        );
        return {
            user: rest,
            tokens,
        };
    }

    async getTokens(userId: number): Promise<Tokens> {
        const user = await this.userGetService.getUserById(userId)
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: user.email,
            role: user.roles
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.AT_SECRET,
                expiresIn: process.env.AT_EXPIRES,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.RT_SECRET,
                expiresIn: process.env.RT_EXPIRES,
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async logOut(userId: number) {
        return await this.userUpdateService.pushNewRefreshToken('', userId);
    }


    async register(createUserDto: CreateUserDTO) {
        const exist = await this.userCheckService.checkExistingUserByEmail(
            createUserDto.email,
        );
        if (exist) throw new ForbiddenException('User already exists');

        const userInput = await this.userGetService.getUsersCreateInput(
            createUserDto,
        );
        const user = await this.userCreateService.createUser(userInput);
        const { password, ...rest } = user;
        const tokens = await this.getTokens(user.userId);
        await this.userUpdateService.pushNewRefreshToken(
            tokens.refreshToken,
            user.userId,
        );
        return {
            user: rest,
            tokens,
        };
    }

    async getNewRefreshToken(userId: number, refreshToken: string) {
        const isTokenMatch = this.userCheckService.checkRefreshToken(
            refreshToken,
            userId,
        );
        if (!isTokenMatch) throw new ForbiddenException('Access denied');
        await this.userDeleteService.deleteRefreshTokenById(
            userId,
            refreshToken,
        );
        return (await this.getTokens(userId)).refreshToken;
    }

    async getNewAccessToken(userId: number, refreshToken: string) {
        const isTokenMatch = this.userCheckService.checkRefreshToken(
            refreshToken,
            userId,
        );
        if (!isTokenMatch) throw new ForbiddenException('Access denied');
        return (await this.getTokens(userId)).accessToken;
    }
}

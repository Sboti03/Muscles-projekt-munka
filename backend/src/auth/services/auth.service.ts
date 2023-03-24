import {ForbiddenException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { UserGetService } from '../../user/services/user-get/user-get.service';
import { compareData } from '../../Common/utils/bcrypt';
import LoginDto from '../dto/login.dto';
import { UserUpdateService } from '../../user/services/user-update/user-update.service';
import { CreateUserDto } from '../../user/dto/createUser.dto';
import { UserCheckService } from '../../user/services/user-check/user-check.service';
import { UserCreateService } from '../../user/services/user-create/user-create.service';
import {JwtService} from "@nestjs/jwt";
import {AuthTokenService} from "./auth-token/auth-token.service";
import {UserDeleteService} from "../../user/services/user-delete/user-delete.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userGetService: UserGetService,
        private userUpdateService: UserUpdateService,
        private userCheckService: UserCheckService,
        private userCreateService: UserCreateService,
        private authTokenService: AuthTokenService,
        private userDeleteService:UserDeleteService,

    ) {}

    async validateUser(loginDto: LoginDto) {
        Logger.log(`LOGIN ${loginDto.email} *******`)
        const user = await this.userGetService.getUserByEmail(loginDto.email);
        if (!user) {
            Logger.log(`No user found with the following email: ${loginDto.email}`)
            throw new ForbiddenException('No user found');
        }

        if (user.isBlocked) {
            Logger.log(`User is blocked userId: ${user.userId} email: ${user.email}`)
            throw new ForbiddenException('You are blocked :(')
        }

        const passMatch: boolean = compareData(
            loginDto.password,
            user.password,
        );
        if (!passMatch) {
            Logger.log(`Password did not matched: ${loginDto.email}`)
            throw new ForbiddenException('Access Denied');
        }

        const { password, refreshTokens, ...rest } = user;
        const tokens = await this.authTokenService.getTokens(user.userId);
        await this.userUpdateService.pushNewRefreshToken(
            tokens.refreshToken,
            user.userId,
        );
        Logger.log(`User logged in ${rest.email} ${user.role.roleName}`)
        return {
            user: rest,
            tokens,
        };
    }


    async logOut(userId: number, refreshToken: string) {
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId)
        if (!isTokenMatch) {
            Logger.warn(`No token found ${userId}`)
            throw new NotFoundException('No token found')
        }
        Logger.log(`User logged out ${userId}`)
        return this.userDeleteService.deleteRefreshTokenById(userId, refreshToken)
    }


    async register(createUserDto: CreateUserDto) {
        const exist = await this.userCheckService.checkExistingUserByEmail(
            createUserDto.email,
        );
        if (exist) throw new ForbiddenException('User already exists');

        const userInput = await this.userGetService.getUsersCreateInput(createUserDto);

        const user = await this.userCreateService.createUser(userInput);
        const { password, ...rest } = user;
        const tokens = await this.authTokenService.getTokens(user.userId);
        await this.userUpdateService.pushNewRefreshToken(
            tokens.refreshToken,
            user.userId,
        );
        return {
            user: rest,
            tokens,
        };
    }

}

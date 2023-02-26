import { ForbiddenException, Injectable } from '@nestjs/common';

import { JwtPayload } from '../types/jwt-payload';
import { Tokens } from '../types/token';
import { UserGetService } from '../../user/services/user-get/user-get.service';
import { compareData } from '../../Common/utils/bcrypt';
import LoginDto from '../dto/login.dto';
import { UserUpdateService } from '../../user/services/user-update/user-update.service';
import { CreateUserDTO } from '../../user/dto/createUserDTO';
import { UserCheckService } from '../../user/services/user-check/user-check.service';
import { UserCreateService } from '../../user/services/user-create/user-create.service';
import {JwtService} from "@nestjs/jwt";
import {AuthTokenService} from "./auth-token/auth-token.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userGetService: UserGetService,
        private userUpdateService: UserUpdateService,
        private userCheckService: UserCheckService,
        private userCreateService: UserCreateService,
        private authTokenService: AuthTokenService,
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

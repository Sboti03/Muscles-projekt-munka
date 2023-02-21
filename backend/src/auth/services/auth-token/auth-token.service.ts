import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserCheckService} from "../../../user/services/user-check/user-check.service";
import {UserDeleteService} from "../../../user/services/user-delete/user-delete.service";
import {Tokens} from "../../types/token";
import {JwtPayload} from "../../types/jwt-payload";
import {UserGetService} from "../../../user/services/user-get/user-get.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthTokenService {

    constructor(private userCheckService: UserCheckService,
                private userDeleteService: UserDeleteService,
                private userGetService: UserGetService,
                private jwtService: JwtService) {
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

}

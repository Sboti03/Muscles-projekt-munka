import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserCheckService} from "../../../user/services/user-check/user-check.service";
import {UserDeleteService} from "../../../user/services/user-delete/user-delete.service";
import {Tokens} from "../../types/token";
import {JwtPayload} from "../../types/jwt-payload";
import {UserGetService} from "../../../user/services/user-get/user-get.service";
import {JwtService} from "@nestjs/jwt";
import {ProfileGetService} from "../../../profile/services/profile-get/profile-get.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {Response} from "express";

@Injectable()
export class AuthTokenService {

    constructor(private userCheckService: UserCheckService,
                private userDeleteService: UserDeleteService,
                private userGetService: UserGetService,
                private jwtService: JwtService,
                private profileGetService: ProfileGetService) {
    }

    async getNewRefreshToken(userId: number) {
        return (await this.getTokens(userId)).refreshToken;
    }

    async getNewAccessToken(userId: number, refreshToken: string) {
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) throw new ForbiddenException('Access denied');
        return (await this.getTokens(userId)).accessToken;
    }

    async getTokens(userId: number): Promise<Tokens> {
        const user = await this.userGetService.getUserById(userId)

        const jwtPayload: JwtPayload = {
            sub: userId,
            email: user.email,
            role: RoleEnum[user.role.roleName.toUpperCase()],
            profileId: user.profileData.profileId
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

    getATMaxAge() {
        return 1000 * 60 * 60
    }

    getRTMaxAge() {
        return 1000 * 60 * 60 * 24 * 365
    }

    storeTokens(tokens: Tokens, res: Response) {
        this.storeACToken(tokens.accessToken, res)
        this.storeRfToken(tokens.refreshToken, res)
    }

    storeRfToken(token: string, res: Response) {
        const rtMaxAge = this.getRTMaxAge();
        res.cookie('refreshToken', token, {httpOnly: true, maxAge: rtMaxAge})
    }

    storeACToken(token: string, res: Response) {
        const atMaxAge = this.getATMaxAge();
        res.cookie('accessToken', token, {httpOnly: true, maxAge: atMaxAge})
    }

}

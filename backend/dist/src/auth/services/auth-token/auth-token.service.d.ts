import { UserCheckService } from "../../../user/services/user-check/user-check.service";
import { UserDeleteService } from "../../../user/services/user-delete/user-delete.service";
import { Tokens } from "../../types/token";
import { UserGetService } from "../../../user/services/user-get/user-get.service";
import { JwtService } from "@nestjs/jwt";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
import { Response } from "express";
export declare class AuthTokenService {
    private userCheckService;
    private userDeleteService;
    private userGetService;
    private jwtService;
    private profileGetService;
    constructor(userCheckService: UserCheckService, userDeleteService: UserDeleteService, userGetService: UserGetService, jwtService: JwtService, profileGetService: ProfileGetService);
    getNewRefreshToken(userId: number): Promise<string>;
    getNewAccessToken(userId: number, refreshToken: string): Promise<string>;
    getTokens(userId: number): Promise<Tokens>;
    getATMaxAge(): number;
    getRTMaxAge(): number;
    storeTokens(tokens: Tokens, res: Response): void;
    storeRfToken(token: string, res: Response): void;
    storeACToken(token: string, res: Response): void;
}

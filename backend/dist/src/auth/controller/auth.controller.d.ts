import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dto/createUser.dto';
import { AuthTokenService } from "../services/auth-token/auth-token.service";
import LoginDto from "../dto/login.dto";
import { Response } from "express";
import { UserCheckService } from "../../user/services/user-check/user-check.service";
import { UserDeleteService } from "../../user/services/user-delete/user-delete.service";
import { UserUpdateService } from "../../user/services/user-update/user-update.service";
import { PasswordChangeDto } from "../dto/password-change.dto";
export declare class AuthController {
    private authService;
    private authTokenService;
    private userCheckService;
    private userDeleteService;
    private userUpdateService;
    constructor(authService: AuthService, authTokenService: AuthTokenService, userCheckService: UserCheckService, userDeleteService: UserDeleteService, userUpdateService: UserUpdateService);
    login(req: any, loginDto: LoginDto, res: Response): any;
    register(createUserDto: CreateUserDto, res: Response): Promise<{
        user: {
            userId: number;
            email: string;
            roleId: number;
            changedAt: Date;
            isBlocked: boolean;
            role: import(".prisma/client").roles;
        };
        tokens: import("../types/token").Tokens;
    }>;
    getRefreshToken(res: Response, userId: number, refreshToken: string): Promise<{
        newToken: string;
    }>;
    getAccessToken(res: Response, refreshToken: string, userId: number): Promise<{
        newToken: string;
    }>;
    logout(res: Response, userId: number, refreshToken: string): Promise<import(".prisma/client").users>;
    changePassword(res: Response, passwordChangeDto: PasswordChangeDto, userId: number): Promise<{
        newToken: string;
    }>;
}

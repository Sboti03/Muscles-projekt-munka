import { UserGetService } from '../../user/services/user-get/user-get.service';
import LoginDto from '../dto/login.dto';
import { UserUpdateService } from '../../user/services/user-update/user-update.service';
import { CreateUserDto } from '../../user/dto/createUser.dto';
import { UserCheckService } from '../../user/services/user-check/user-check.service';
import { UserCreateService } from '../../user/services/user-create/user-create.service';
import { JwtService } from "@nestjs/jwt";
import { AuthTokenService } from "./auth-token/auth-token.service";
import { UserDeleteService } from "../../user/services/user-delete/user-delete.service";
import { roles, users } from "@prisma/client";
export declare class AuthService {
    private jwtService;
    private userGetService;
    private userUpdateService;
    private userCheckService;
    private userCreateService;
    private authTokenService;
    private userDeleteService;
    constructor(jwtService: JwtService, userGetService: UserGetService, userUpdateService: UserUpdateService, userCheckService: UserCheckService, userCreateService: UserCreateService, authTokenService: AuthTokenService, userDeleteService: UserDeleteService);
    validateUser(loginDto: LoginDto): Promise<{
        user: {
            userId: number;
            email: string;
            roleId: number;
            changedAt: Date;
            isBlocked: boolean;
            isDeleted: boolean;
            role: roles;
        };
        tokens: import("../types/token").Tokens;
    }>;
    logOut(userId: number, refreshToken: string): Promise<users>;
    register(createUserDto: CreateUserDto): Promise<{
        user: {
            userId: number;
            email: string;
            roleId: number;
            changedAt: Date;
            isBlocked: boolean;
            isDeleted: boolean;
            role: roles;
        };
        tokens: import("../types/token").Tokens;
    }>;
    handleUserLogin(user: users & {
        role: roles;
    }): Promise<{
        user: {
            userId: number;
            email: string;
            roleId: number;
            changedAt: Date;
            isBlocked: boolean;
            isDeleted: boolean;
            role: roles;
        };
        tokens: import("../types/token").Tokens;
    }>;
}
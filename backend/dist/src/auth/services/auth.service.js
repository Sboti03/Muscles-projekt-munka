"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_get_service_1 = require("../../user/services/user-get/user-get.service");
const bcrypt_1 = require("../../Common/utils/bcrypt");
const user_update_service_1 = require("../../user/services/user-update/user-update.service");
const user_check_service_1 = require("../../user/services/user-check/user-check.service");
const user_create_service_1 = require("../../user/services/user-create/user-create.service");
const jwt_1 = require("@nestjs/jwt");
const auth_token_service_1 = require("./auth-token/auth-token.service");
const user_delete_service_1 = require("../../user/services/user-delete/user-delete.service");
let AuthService = class AuthService {
    constructor(jwtService, userGetService, userUpdateService, userCheckService, userCreateService, authTokenService, userDeleteService) {
        this.jwtService = jwtService;
        this.userGetService = userGetService;
        this.userUpdateService = userUpdateService;
        this.userCheckService = userCheckService;
        this.userCreateService = userCreateService;
        this.authTokenService = authTokenService;
        this.userDeleteService = userDeleteService;
    }
    async validateUser(loginDto) {
        common_1.Logger.log(`LOGIN ${loginDto.email} *******`);
        const user = await this.userGetService.getUserByEmail(loginDto.email);
        if (!user) {
            common_1.Logger.log(`No user found with the following email: ${loginDto.email}`);
            throw new common_1.ForbiddenException('No user found');
        }
        const passMatch = (0, bcrypt_1.compareData)(loginDto.password, user.password);
        if (!passMatch) {
            common_1.Logger.log(`Password did not matched: ${loginDto.email}`);
            throw new common_1.ForbiddenException('Access Denied');
        }
        const { password, refreshTokens } = user, rest = __rest(user, ["password", "refreshTokens"]);
        const tokens = await this.authTokenService.getTokens(user.userId);
        await this.userUpdateService.pushNewRefreshToken(tokens.refreshToken, user.userId);
        common_1.Logger.log(`User logged in ${rest.email} ${user.role.roleName}`);
        return {
            user: rest,
            tokens,
        };
    }
    async logOut(userId, refreshToken) {
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) {
            common_1.Logger.warn(`No token found ${userId}`);
            throw new common_1.NotFoundException('No token found');
        }
        common_1.Logger.log(`User logged out ${userId}`);
        return this.userDeleteService.deleteRefreshTokenById(userId, refreshToken);
    }
    async register(createUserDto) {
        const exist = await this.userCheckService.checkExistingUserByEmail(createUserDto.email);
        if (exist)
            throw new common_1.ForbiddenException('User already exists');
        const userInput = await this.userGetService.getUsersCreateInput(createUserDto);
        const user = await this.userCreateService.createUser(userInput);
        const { password } = user, rest = __rest(user, ["password"]);
        const tokens = await this.authTokenService.getTokens(user.userId);
        await this.userUpdateService.pushNewRefreshToken(tokens.refreshToken, user.userId);
        return {
            user: rest,
            tokens,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_get_service_1.UserGetService,
        user_update_service_1.UserUpdateService,
        user_check_service_1.UserCheckService,
        user_create_service_1.UserCreateService,
        auth_token_service_1.AuthTokenService,
        user_delete_service_1.UserDeleteService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
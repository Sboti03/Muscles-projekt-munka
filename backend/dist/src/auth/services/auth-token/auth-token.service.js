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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenService = void 0;
const common_1 = require("@nestjs/common");
const user_check_service_1 = require("../../../user/services/user-check/user-check.service");
const user_delete_service_1 = require("../../../user/services/user-delete/user-delete.service");
const user_get_service_1 = require("../../../user/services/user-get/user-get.service");
const jwt_1 = require("@nestjs/jwt");
const profile_get_service_1 = require("../../../profile/services/profile-get/profile-get.service");
const roles_1 = require("../../../Common/Role/utils/roles");
let AuthTokenService = class AuthTokenService {
    constructor(userCheckService, userDeleteService, userGetService, jwtService, profileGetService) {
        this.userCheckService = userCheckService;
        this.userDeleteService = userDeleteService;
        this.userGetService = userGetService;
        this.jwtService = jwtService;
        this.profileGetService = profileGetService;
    }
    async getNewRefreshToken(userId) {
        return (await this.getTokens(userId)).refreshToken;
    }
    async getNewAccessToken(userId, refreshToken) {
        const isTokenMatch = this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch)
            throw new common_1.ForbiddenException('Access denied');
        return (await this.getTokens(userId)).accessToken;
    }
    async getTokens(userId) {
        const user = await this.userGetService.getUserById(userId);
        let profileId = -1;
        try {
            profileId = (await this.profileGetService.getProfileIdByUserId(userId)).profileId;
        }
        catch (e) {
        }
        const jwtPayload = {
            sub: userId,
            email: user.email,
            role: roles_1.RoleEnum[user.role.roleName.toUpperCase()],
            profileId: profileId
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
        return 1000 * 60 * 60;
    }
    getRTMaxAge() {
        return 1000 * 60 * 60 * 24 * 365;
    }
    storeTokens(tokens, res) {
        this.storeACToken(tokens.accessToken, res);
        this.storeRfToken(tokens.refreshToken, res);
    }
    storeRfToken(token, res) {
        const rtMaxAge = this.getRTMaxAge();
        res.cookie('refreshToken', token, { httpOnly: true, maxAge: rtMaxAge });
    }
    storeACToken(token, res) {
        const atMaxAge = this.getATMaxAge();
        res.cookie('accessToken', token, { httpOnly: true, maxAge: atMaxAge });
    }
};
AuthTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_check_service_1.UserCheckService,
        user_delete_service_1.UserDeleteService,
        user_get_service_1.UserGetService,
        jwt_1.JwtService,
        profile_get_service_1.ProfileGetService])
], AuthTokenService);
exports.AuthTokenService = AuthTokenService;
//# sourceMappingURL=auth-token.service.js.map
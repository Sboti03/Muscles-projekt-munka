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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../decorators/decorators");
const refresh_token_guard_1 = require("../guards/refresh-token.guard");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const auth_service_1 = require("../services/auth.service");
const createUser_dto_1 = require("../../user/dto/createUser.dto");
const access_token_guard_1 = require("../guards/access-token.guard");
const auth_token_service_1 = require("../services/auth-token/auth-token.service");
const login_dto_1 = require("../dto/login.dto");
const user_check_service_1 = require("../../user/services/user-check/user-check.service");
const user_delete_service_1 = require("../../user/services/user-delete/user-delete.service");
const user_update_service_1 = require("../../user/services/user-update/user-update.service");
const password_change_dto_1 = require("../dto/password-change.dto");
const swagger_1 = require("@nestjs/swagger");
const login_response_1 = require("../dto/login.response");
let AuthController = class AuthController {
    constructor(authService, authTokenService, userCheckService, userDeleteService, userUpdateService) {
        this.authService = authService;
        this.authTokenService = authTokenService;
        this.userCheckService = userCheckService;
        this.userDeleteService = userDeleteService;
        this.userUpdateService = userUpdateService;
    }
    login(req, loginDto, res) {
        common_1.Logger.log(`/auth/login (POST) email: ${loginDto.email} password: ********`);
        const tokens = req.user.tokens;
        this.authTokenService.storeTokens(tokens, res);
        return req.user;
    }
    async register(createUserDto, res) {
        common_1.Logger.log(`/auth/register (POST) email: ${createUserDto.email} isCoach: ${createUserDto.isCoach} password: ${(!!createUserDto.password)}`);
        const userData = await this.authService.register(createUserDto);
        const tokens = userData.tokens;
        this.authTokenService.storeTokens(tokens, res);
        return userData;
    }
    async getRefreshToken(res, userId, refreshToken) {
        common_1.Logger.log(`/auth/refresh (GET) userId: ${userId}`);
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) {
            common_1.Logger.log(`Access denied for userId: ${userId} refreshToken: ${refreshToken}`);
            throw new common_1.ForbiddenException('Access denied');
        }
        await this.userDeleteService.deleteRefreshTokenById(userId, refreshToken);
        const newToken = await this.authTokenService.getNewRefreshToken(userId);
        this.authTokenService.storeRfToken(newToken, res);
        await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(() => {
            common_1.Logger.log(`Error while pushing new token userId: ${userId}`);
            throw new common_1.ConflictException('Error while pushing new token');
        });
        common_1.Logger.log(`New token for userId: ${userId}`);
        return { newToken };
    }
    async getAccessToken(res, refreshToken, userId) {
        common_1.Logger.log(`/auth/access (GET)`);
        const isUserExist = await this.userCheckService.checkUserById(userId);
        common_1.Logger.log(`Trying to get new access token userId: ${userId} user exists: ${isUserExist}`);
        if (!isUserExist) {
            throw new common_1.NotFoundException("No user found");
        }
        const acToken = await this.authTokenService.getNewAccessToken(userId, refreshToken);
        this.authTokenService.storeACToken(acToken, res);
        return { newToken: acToken };
    }
    logout(res, userId, refreshToken) {
        common_1.Logger.log(`/auth/logout (GET) userId: ${userId}`);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return this.authService.logOut(userId, refreshToken);
    }
    async changePassword(res, passwordChangeDto, userId) {
        common_1.Logger.log(`/auth/password (PATCH) userId: ${userId}`);
        await this.userUpdateService.updatePassword(passwordChangeDto.oldPassword, passwordChangeDto.newPassword, userId);
        const newToken = await this.authTokenService.getNewRefreshToken(userId);
        this.authTokenService.storeRfToken(newToken, res);
        await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(() => {
            throw new common_1.ConflictException('Error while pushing new token');
        });
        common_1.Logger.log(`New token for userId: ${userId}`);
        return { newToken };
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOkResponse)({ status: 200, type: login_response_1.default }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No user found' }),
    (0, swagger_1.ApiResponse)({ status: 423, description: 'User is blocked' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Wrong post body' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.default, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUserRefreshToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRefreshToken", null);
__decorate([
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('access'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, decorators_1.GetCurrentUserRefreshToken)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUserRefreshToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Patch)('password'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, password_change_dto_1.PasswordChangeDto, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, auth_token_service_1.AuthTokenService,
        user_check_service_1.UserCheckService,
        user_delete_service_1.UserDeleteService,
        user_update_service_1.UserUpdateService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
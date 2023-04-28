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
const _roles_decorator_1 = require("../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../Common/Role/utils/roles");
const access_token_guard_1 = require("../guards/access-token.guard");
const role_guard_1 = require("../guards/role.guard");
const auth_token_service_1 = require("../services/auth-token/auth-token.service");
const login_dto_1 = require("../dto/login.dto");
const user_check_service_1 = require("../../user/services/user-check/user-check.service");
const user_delete_service_1 = require("../../user/services/user-delete/user-delete.service");
const user_update_service_1 = require("../../user/services/user-update/user-update.service");
let AuthController = class AuthController {
    constructor(authService, authTokenService, userCheckService, userDeleteService, userUpdateService) {
        this.authService = authService;
        this.authTokenService = authTokenService;
        this.userCheckService = userCheckService;
        this.userDeleteService = userDeleteService;
        this.userUpdateService = userUpdateService;
    }
    login(req, loginDto, res) {
        const tokens = req.user.tokens;
        this.authTokenService.storeTokens(tokens, res);
        return req.user;
    }
    async register(createUserDto, res) {
        const userData = await this.authService.register(createUserDto);
        const tokens = userData.tokens;
        this.authTokenService.storeTokens(tokens, res);
        return userData;
    }
    async getRefreshToken(res, userId, refreshToken) {
        const isTokenMatch = await this.userCheckService.checkRefreshToken(refreshToken, userId);
        if (!isTokenMatch) {
            throw new common_1.ForbiddenException('Access denied');
        }
        await this.userDeleteService.deleteRefreshTokenById(userId, refreshToken);
        const newToken = await this.authTokenService.getNewRefreshToken(userId);
        this.authTokenService.storeRfToken(newToken, res);
        await this.userUpdateService.pushNewRefreshToken(newToken, userId)
            .catch(reason => {
            throw new common_1.ConflictException('Error while pushing new token');
        });
        return { newToken };
    }
    async getAccessToken(res, refreshToken, userId) {
        const acToken = await this.authTokenService.getNewAccessToken(userId, refreshToken);
        this.authTokenService.storeACToken(acToken, res);
        return acToken;
    }
    admin() {
        return 'Szia admin báttya';
    }
    logout(res, userId, refreshToken) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return this.authService.logOut(userId, refreshToken);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.default, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
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
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUserRefreshToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getRefreshToken", null);
__decorate([
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Header)('Content-Type', 'application/json'),
    (0, common_1.Get)('access'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, decorators_1.GetCurrentUserRefreshToken)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAccessToken", null);
__decorate([
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.COACH),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, common_1.Get)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "admin", null);
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
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, auth_token_service_1.AuthTokenService,
        user_check_service_1.UserCheckService,
        user_delete_service_1.UserDeleteService,
        user_update_service_1.UserUpdateService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
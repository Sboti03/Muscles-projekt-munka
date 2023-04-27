"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./controller/auth.controller");
const auth_service_1 = require("./services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const access_token_strategy_1 = require("./strategy/access-token.strategy");
const local_strategy_1 = require("./strategy/local.strategy");
const refresh_token_strategy_1 = require("./strategy/refresh-token.strategy");
const user_module_1 = require("../user/user.module");
const role_guard_1 = require("./guards/role.guard");
const auth_token_service_1 = require("./services/auth-token/auth-token.service");
const profile_get_service_1 = require("../profile/services/profile-get/profile-get.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        providers: [
            auth_service_1.AuthService,
            jwt_1.JwtService,
            access_token_strategy_1.AccessTokenStrategy,
            local_strategy_1.LocalStrategy,
            refresh_token_strategy_1.RefreshTokenStrategy,
            role_guard_1.RolesGuard,
            auth_token_service_1.AuthTokenService,
            profile_get_service_1.ProfileGetService,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, auth_token_service_1.AuthTokenService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
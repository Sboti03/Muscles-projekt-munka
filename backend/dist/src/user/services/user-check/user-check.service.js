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
exports.UserCheckService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const bcrypt_1 = require("../../../Common/utils/bcrypt");
const user_get_service_1 = require("../user-get/user-get.service");
let UserCheckService = class UserCheckService {
    constructor(prismaService, getUserService) {
        this.prismaService = prismaService;
        this.getUserService = getUserService;
    }
    async checkEmail(email, userId) {
        const user = await this.getUserService.getUserById(userId);
        return email === user.email;
    }
    async checkPassword(password, userId) {
        const user = await this.getUserService.getUserById(userId);
        return (0, bcrypt_1.compareData)(password, user.password);
    }
    async checkRefreshToken(refreshToken, userId) {
        const user = await this.getUserService.getUserById(userId);
        if (user.refreshTokens) {
            for (const token of user.refreshTokens) {
                if ((0, bcrypt_1.compareData)(refreshToken, token)) {
                    common_1.Logger.log('Token match');
                    return true;
                }
            }
        }
        return false;
    }
    async checkExistingUserByEmail(email) {
        const user = await this.getUserService.getUserByEmail(email);
        return !!user;
    }
};
UserCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        user_get_service_1.UserGetService])
], UserCheckService);
exports.UserCheckService = UserCheckService;
//# sourceMappingURL=user-check.service.js.map
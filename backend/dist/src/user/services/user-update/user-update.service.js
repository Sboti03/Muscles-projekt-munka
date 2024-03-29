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
exports.UserUpdateService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("../../../Common/utils/bcrypt");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const user_check_service_1 = require("../user-check/user-check.service");
const user_get_service_1 = require("../user-get/user-get.service");
const argon2 = require("argon2");
let UserUpdateService = class UserUpdateService {
    constructor(userGetService, prismaService, checkUserService) {
        this.userGetService = userGetService;
        this.prismaService = prismaService;
        this.checkUserService = checkUserService;
    }
    async updatePassword(oldPassword, newPassword, userId) {
        const isOldPasswordMatch = await this.checkUserService.checkPassword(oldPassword, userId);
        if (!isOldPasswordMatch) {
            common_1.Logger.log(`Password is not the same userId: ${userId}`);
            throw new common_1.NotFoundException('Password is not the same');
        }
        const isNewPasswordNotTheSame = await this.checkUserService.checkPassword(newPassword, userId);
        if (isNewPasswordNotTheSame) {
            common_1.Logger.log(`Cannot be the same password userId: ${userId}`);
            throw new common_1.BadRequestException('Cannot be the same password');
        }
        newPassword = (0, bcrypt_1.encryptData)(newPassword);
        common_1.Logger.log(`Password changed userId: ${userId}`);
        return this.prismaService.users.update({
            data: {
                password: newPassword,
                refreshTokens: [],
            },
            where: { userId },
        });
    }
    async pushNewRefreshToken(refreshToken, userId) {
        return this.prismaService.users.update({
            data: {
                refreshTokens: {
                    push: await argon2.hash(refreshToken),
                },
            },
            where: { userId },
        });
    }
    async updateEmail(email, userId) {
        if (await this.checkUserService.checkEmail(email, userId)) {
            throw new common_1.ConflictException('Cannot be the same email');
        }
        return this.prismaService.users.update({
            data: { email },
            where: { userId },
        });
    }
};
UserUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_get_service_1.UserGetService,
        prirsma_service_1.PrismaService,
        user_check_service_1.UserCheckService])
], UserUpdateService);
exports.UserUpdateService = UserUpdateService;
//# sourceMappingURL=user-update.service.js.map
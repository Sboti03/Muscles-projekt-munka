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
exports.UserDeleteService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("../../../Common/utils/bcrypt");
const user_check_service_1 = require("../user-check/user-check.service");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const user_get_service_1 = require("../user-get/user-get.service");
let UserDeleteService = class UserDeleteService {
    constructor(checkUserService, prismaService, userGetService) {
        this.checkUserService = checkUserService;
        this.prismaService = prismaService;
        this.userGetService = userGetService;
    }
    async deleteRefreshTokenById(userId, refreshToken) {
        const { refreshTokens } = await this.userGetService.getTokensByUserId(userId);
        let newTokens = [];
        common_1.Logger.log(refreshTokens);
        for (let i = 0; i < refreshTokens.length; i++) {
            common_1.Logger.log(refreshTokens[i]);
            common_1.Logger.log(i);
            if (!(0, bcrypt_1.compareData)(refreshToken, refreshTokens[i])) {
                newTokens.push(refreshTokens[i]);
            }
            else {
                common_1.Logger.log("Same token found at: " + i);
            }
        }
        common_1.Logger.log(newTokens);
        return this.prismaService.users.update({
            where: { userId },
            data: {
                refreshTokens: {
                    set: newTokens
                }
            }
        });
    }
};
UserDeleteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_check_service_1.UserCheckService,
        prirsma_service_1.PrismaService,
        user_get_service_1.UserGetService])
], UserDeleteService);
exports.UserDeleteService = UserDeleteService;
//# sourceMappingURL=user-delete.service.js.map
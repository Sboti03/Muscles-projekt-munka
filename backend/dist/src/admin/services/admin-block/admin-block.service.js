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
exports.AdminBlockService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const roles_1 = require("../../../Common/Role/utils/roles");
const crypto = require("crypto");
let AdminBlockService = class AdminBlockService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async blockUserByUserId(userId) {
        const user = await this.prismaService.users.findUnique({ where: { userId }, include: { role: true } });
        if (!user || user.role.roleName === roles_1.RoleEnum.ADMIN) {
            throw new common_1.NotFoundException("No user or coach found");
        }
        return this.prismaService.users.update({
            where: {
                userId,
            },
            data: {
                isBlocked: true,
            },
        });
    }
    unblockUserById(userId) {
        return this.prismaService.users.update({
            where: { userId },
            data: { isBlocked: false }
        });
    }
    async deleteAllUserData(email) {
        const res = await this.prismaService.users.findFirst({
            where: {
                email,
                role: {
                    OR: [
                        { roleName: roles_1.RoleEnum.USER },
                        { roleName: roles_1.RoleEnum.COACH }
                    ]
                },
                isDeleted: false
            },
        });
        common_1.Logger.log(`${res.roleId}`);
        if (!res) {
            throw new common_1.NotFoundException("No user found");
        }
        return this.prismaService.users.update({
            where: { email },
            data: {
                email: crypto.randomUUID(),
                password: '',
                isDeleted: true,
                isBlocked: true,
                profileData: {
                    update: {
                        birthDay: null,
                        firstName: '',
                        lastName: '',
                        height: 0,
                        profilePicPath: ''
                    }
                }
            }
        });
    }
};
AdminBlockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], AdminBlockService);
exports.AdminBlockService = AdminBlockService;
//# sourceMappingURL=admin-block.service.js.map
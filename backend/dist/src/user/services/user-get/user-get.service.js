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
exports.UserGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const roles_1 = require("../../../Common/Role/utils/roles");
const bcrypt_1 = require("../../../Common/utils/bcrypt");
let UserGetService = class UserGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getUserByEmail(email) {
        return this.prismaService.users.findUnique({
            where: {
                email,
            },
            include: {
                role: true
            },
        });
    }
    getUserById(userId) {
        return this.prismaService.users.findUnique({
            where: {
                userId,
            },
            include: {
                role: true
            },
        });
    }
    getRoleId(isCoach) {
        return isCoach ? roles_1.Roles.COACH.roleId : roles_1.Roles.USER.roleId;
    }
    getUsersCreateInput(user) {
        const roleId = this.getRoleId(user.isCoach);
        return {
            email: user.email,
            password: (0, bcrypt_1.encryptData)(user.password),
            role: {
                connect: {
                    roleId,
                },
            },
            refreshTokens: [],
            profileData: {
                create: {
                    goal: {
                        create: [{}]
                    },
                }
            }
        };
    }
    getTokensByUserId(userId) {
        return this.prismaService.users.findUnique({
            select: {
                refreshTokens: true
            },
            where: {
                userId,
            },
        });
    }
    getAllUser() {
        return this.prismaService.users.findMany({
            include: { role: true }
        });
    }
};
UserGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], UserGetService);
exports.UserGetService = UserGetService;
//# sourceMappingURL=user-get.service.js.map
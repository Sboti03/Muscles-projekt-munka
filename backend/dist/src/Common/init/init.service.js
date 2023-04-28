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
exports.InitService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../utils/prirsma.service");
const roles_1 = require("../Role/utils/roles");
const units_1 = require("../units/units/units");
const PeriodNames_1 = require("../utils/PeriodNames");
let InitService = class InitService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async init() {
        const roles = roles_1.Roles;
        try {
            await this.prismaService.roles.createMany({
                data: [
                    { roleId: roles.ADMIN.roleId, roleName: roles.ADMIN.roleName },
                    { roleId: roles.COACH.roleId, roleName: roles.COACH.roleName },
                    { roleId: roles.USER.roleId, roleName: roles.USER.roleName },
                ]
            });
            for (const data of units_1.Units) {
                await this.prismaService.units.create({
                    data: {
                        unit: data.unit,
                        unitId: data.unitId,
                        defaultValue: data.defaultValue
                    }
                });
            }
            return true;
        }
        catch (e) {
            return e;
        }
    }
    async initPeriods() {
        const values = Object.values(PeriodNames_1.PeriodNamesEnum);
        for (const v of values) {
            await this.prismaService.mealPeriods.create({
                data: {
                    periodName: v
                }
            });
        }
    }
    async createAdmin(userId) {
        return this.prismaService.users.update({
            where: {
                userId
            },
            data: {
                role: {
                    connect: {
                        roleId: roles_1.Roles.ADMIN.roleId
                    }
                }
            }
        });
    }
};
InitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], InitService);
exports.InitService = InitService;
//# sourceMappingURL=init.service.js.map
import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prirsma.service";
import {Roles} from "../Role/utils/roles";
import {Units} from "../units/units/units";
import {PeriodNamesEnum} from "../utils/PeriodNames";

@Injectable()
export class InitService {

    constructor(private prismaService:PrismaService) {}

    async init() {
        const roles = Roles
        try {
            await this.prismaService.roles.createMany({
                data: [
                    {roleId: roles.ADMIN.roleId, roleName: roles.ADMIN.roleName},
                    {roleId: roles.COACH.roleId, roleName: roles.COACH.roleName},
                    {roleId: roles.USER.roleId, roleName: roles.USER.roleName},
                ]
            })
            for (const data of Units) {
                await this.prismaService.units.create({
                    data: {
                        unit: data.unit,
                        unitId: data.unitId,
                        defaultValue: data.defaultValue
                    }
                })
            }
            return true
        } catch (e) {
            return e
        }

    }

    async initPeriods() {
        const values = Object.values(PeriodNamesEnum)
        for (const v of values) {
            await this.prismaService.mealPeriods.create({
                data: {
                    periodName: v
                }
            })
        }
    }

    async createAdmin(userId: number) {
        return this.prismaService.users.update({
            where: {
                userId
            },
            data: {
                role: {
                    connect: {
                        roleId: Roles.ADMIN.roleId
                    }
                }
            }
        })
    }

}

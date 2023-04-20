import {Prisma, PrismaClient} from '@prisma/client'
import {Roles} from "../src/Common/Role/utils/roles";
import {PrismaService} from "../src/Common/utils/prirsma.service";
import {PeriodNamesEnum} from "../src/Common/utils/PeriodNames";
import {encryptData} from "../src/Common/utils/bcrypt";
import {Units} from "../src/Common/units/units/units";
const prisma = new PrismaClient()
async function main() {
    const prisma: PrismaService = new PrismaService()
    const roles = Object.values(Roles).map(async roles => {
        return await prisma.roles.upsert({
            where: {roleId: roles.roleId},
            update: {},
            create: {
                roleId: roles.roleId,
                roleName: roles.roleName
            }
        })
    })
    const admin = await prisma.users.upsert({
        where: {email: 'admin@muscles.com'},
        update: {},
        create: {
            roles: {connect: {roleId: Roles.ADMIN.roleId}},
            email: 'admin@muscles.com',
            password: encryptData('admin')
        }
    })
    const units = Units.map(async unit => {
        return await prisma.units.upsert({
            where: {unitId: unit.unitId},
            update: {},
            create: {
                unitId: unit.unitId,
                defaultValue: unit.defaultValue,
                unit: unit.unit
            },

        })
    })
    const periodNames = Object.values(PeriodNamesEnum).map(async periodName => {
        return await prisma.mealPeriods.upsert({
            where: {periodName: periodName},
            update: {},
            create: {
                periodName: periodName,
            }
        })
    })
    console.log(periodNames, roles)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
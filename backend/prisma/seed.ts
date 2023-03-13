import {Prisma, PrismaClient} from '@prisma/client'
import {Roles} from "../src/Common/Role/utils/roles";
import {PrismaService} from "../src/Common/utils/prirsma.service";
import {PeriodNamesEnum} from "../src/Common/utils/PeriodNames";
import {encryptData} from "../src/Common/utils/bcrypt";
import {Units} from "../src/Common/units/units/units";
import * as fs from "fs";
import * as process from "process";
const prisma = new PrismaClient()
async function main() {
    const prisma: PrismaService = new PrismaService()
    const roles = Object.values(Roles).map(async roles => {
        const result = await prisma.roles.upsert({
            where: {roleId: roles.roleId},
            update: {},
            create: {
                roleId: roles.roleId,
                roleName: roles.roleName,
                users: {create: []}
            }
        })
        console.log(result)
        return result
    })
    const admin = await prisma.users.upsert({
        where: {email: 'admin@muscles.com'},
        update: {},
        create: {
            roles: {connectOrCreate: {where: {roleId: Roles.ADMIN.roleId}, create: {roleId: Roles.ADMIN.roleId, roleName: Roles.ADMIN.roleName}}},
            email: 'admin@muscles.com',
            password: encryptData('admin'),
            profileData: {
                create: {birthDay: new Date(),goal: {create: [{}]}, height: 200, firstName: 'admin'}
            }
        }
    })
    const units = Units.map(async unit => {
        const result = await prisma.units.upsert({
            where: {unitId: unit.unitId},
            update: {},
            create: {
                unitId: unit.unitId,
                defaultValue: unit.defaultValue,
                unit: unit.unit
            },
        })
        console.log(result)
        return result
    })

    const periodNames = Object.values(PeriodNamesEnum).map(async periodName => {
        const result = await prisma.mealPeriods.upsert({
            where: {periodName: periodName},
            update: {},
            create: {
                periodName: periodName,
            }
        })
        console.log(result)
        return result
    })
    console.log(periodNames, roles)

    const foods = readFoods()
    for (const food of foods) {
        const result = await prisma.foods.upsert({
            where: {
                name: food.name
            },
            update: {},
            create: food
        })
        console.log(result)
    }
    console.log(admin, units)
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



function readFoods() {

    let foods: Prisma.foodsCreateInput[] = []
    // [0]     [1]                [2]            [3]    [4]                  [5]          [6]
    // [0]Name;[1]Calories (kcal);[2]Protein (g);[3]Fat;[4]Carbohydrates (g);[5]Fiber (g);[6]Sugar (g)
    const file = fs.readFileSync( process.cwd() +'/prisma/food.csv', 'utf8')
    const lines = file.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (i !== 0) {
            const food = lines[i].split(';')
            foods.push({
                name: food[0].toLowerCase(),
                kcal: parseFloat(food[1]),
                protein: parseFloat(food[2]),
                fat: parseFloat(food[3]),
                carbohydrate: parseFloat(food[4]),
                fiber: parseFloat(food[5]),
                sugar: parseFloat(food[6]),
                perUnit: 100,
                unit: {connect: {unit: 'gram'}},
            })
        }
    }
    return foods

}

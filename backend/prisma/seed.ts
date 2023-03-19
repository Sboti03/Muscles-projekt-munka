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

    await prisma.roles.upsert({
        where: {roleId: Roles.ADMIN.roleId},
        update: {},
        create: {
            roleId: Roles.ADMIN.roleId,
            roleName: Roles.ADMIN.roleName,
            users: {create: []}
        }
    })

    await prisma.roles.upsert({
        where: {roleId: Roles.USER.roleId},
        update: {},
        create: {
            roleId: Roles.USER.roleId,
            roleName: Roles.USER.roleName,
            users: {create: []}
        }
    })

    await prisma.roles.upsert({
        where: {roleId: Roles.COACH.roleId},
        update: {},
        create: {
            roleId: Roles.COACH.roleId,
            roleName: Roles.COACH.roleName,
            users: {create: []}
        }
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


    for (const objOfUnit of Units) {
        await prisma.units.upsert({
            where: {unit: objOfUnit.unit},
            update: {},
            create: {
                unitId: objOfUnit.unitId,
                unit: objOfUnit.unit,
                defaultValue: objOfUnit.defaultValue,
            }
        })
    }

    Object.values(PeriodNamesEnum).map(async periodName => {
        await prisma.mealPeriods.upsert({
            where: {periodName: periodName},
            update: {},
            create: {
                periodName: periodName,
            }
        })
    })

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

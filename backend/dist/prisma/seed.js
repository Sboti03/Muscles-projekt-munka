"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const roles_1 = require("../src/Common/Role/utils/roles");
const prirsma_service_1 = require("../src/Common/utils/prirsma.service");
const PeriodNames_1 = require("../src/Common/utils/PeriodNames");
const bcrypt_1 = require("../src/Common/utils/bcrypt");
const units_1 = require("../src/Common/units/units/units");
const fs = require("fs");
const process = require("process");
const prisma = new client_1.PrismaClient();
async function main() {
    const prisma = new prirsma_service_1.PrismaService();
    await prisma.roles.upsert({
        where: { roleId: roles_1.Roles.ADMIN.roleId },
        update: {},
        create: {
            roleId: roles_1.Roles.ADMIN.roleId,
            roleName: roles_1.Roles.ADMIN.roleName,
            users: { create: [] }
        }
    });
    await prisma.roles.upsert({
        where: { roleId: roles_1.Roles.USER.roleId },
        update: {},
        create: {
            roleId: roles_1.Roles.USER.roleId,
            roleName: roles_1.Roles.USER.roleName,
            users: { create: [] }
        }
    });
    await prisma.roles.upsert({
        where: { roleId: roles_1.Roles.COACH.roleId },
        update: {},
        create: {
            roleId: roles_1.Roles.COACH.roleId,
            roleName: roles_1.Roles.COACH.roleName,
            users: { create: [] }
        }
    });
    const admin = await prisma.users.upsert({
        where: { email: 'admin@muscles.com' },
        update: {},
        create: {
            role: { connectOrCreate: { where: { roleId: roles_1.Roles.ADMIN.roleId }, create: { roleId: roles_1.Roles.ADMIN.roleId, roleName: roles_1.Roles.ADMIN.roleName } } },
            email: 'admin@muscles.com',
            password: (0, bcrypt_1.encryptData)('admin'),
            profileData: {
                create: { birthDay: new Date(), goal: { create: [{}] }, height: 200, firstName: 'admin', male: true, registrationDate: new Date(1969, 2, 2) }
            }
        }
    });
    console.log(admin);
    for (const objOfUnit of units_1.Units) {
        await prisma.units.upsert({
            where: { unit: objOfUnit.unit },
            update: {},
            create: {
                unitId: objOfUnit.unitId,
                unit: objOfUnit.unit,
                defaultValue: objOfUnit.defaultValue,
            }
        });
    }
    Object.values(PeriodNames_1.PeriodNamesEnum).map(async (periodName) => {
        await prisma.mealPeriods.upsert({
            where: { periodName: periodName },
            update: {},
            create: {
                periodName: periodName,
            }
        });
    });
    const foods = readFoods();
    for (const food of foods) {
        const result = await prisma.foods.upsert({
            where: {
                name: food.name
            },
            update: {},
            create: food
        });
        console.log(result);
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
function readFoods() {
    let foods = [];
    const file = fs.readFileSync(process.cwd() + '/prisma/food.csv', 'utf8');
    const lines = file.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (i !== 0) {
            const food = lines[i].split(';');
            foods.push({
                name: food[0].toLowerCase(),
                kcal: parseFloat(food[1]),
                protein: parseFloat(food[2]),
                fat: parseFloat(food[3]),
                carbohydrate: parseFloat(food[4]),
                fiber: parseFloat(food[5]),
                sugar: parseFloat(food[6]),
                perUnit: 100,
                unit: { connect: { unit: 'gram' } },
            });
        }
    }
    return foods;
}
//# sourceMappingURL=seed.js.map
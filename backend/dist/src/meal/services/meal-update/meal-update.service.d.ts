import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class MealUpdateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    updateAmountByMealId(mealId: number, amount: number): Prisma.Prisma__mealsClient<import(".prisma/client").meals, never>;
    updateCompletedByMealId(mealId: number, isCompleted: boolean): Prisma.Prisma__mealsClient<import(".prisma/client").meals, never>;
    updateMealByMealId(mealUpdateInput: Prisma.mealsUpdateInput, mealId: any): Prisma.Prisma__mealsClient<import(".prisma/client").meals, never>;
}

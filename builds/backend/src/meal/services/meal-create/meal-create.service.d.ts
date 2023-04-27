import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class MealCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createMeal(mealCreateInput: Prisma.mealsCreateInput): Prisma.Prisma__mealsClient<{
        mealId: number;
    }, never>;
}

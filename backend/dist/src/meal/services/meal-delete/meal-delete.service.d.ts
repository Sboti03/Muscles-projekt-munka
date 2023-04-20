import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class MealDeleteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteMealByMealId(mealId: number): import(".prisma/client").Prisma.Prisma__mealsClient<import(".prisma/client").meals, never>;
}

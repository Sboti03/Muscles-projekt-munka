import { Prisma } from "@prisma/client";
import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class MealHistoryCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createMealHistory(mealHistoryCreateInput: Prisma.mealHistoryCreateInput): Prisma.Prisma__mealHistoryClient<{
        mealId: number;
    }, never>;
}

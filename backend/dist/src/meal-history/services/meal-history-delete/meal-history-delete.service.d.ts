import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class MealHistoryDeleteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteMealHistoryById(mealHistoryId: number): import(".prisma/client").Prisma.Prisma__mealHistoryClient<import(".prisma/client").mealHistory, never>;
}

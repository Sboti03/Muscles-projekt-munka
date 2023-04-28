import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class AdminFoodService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteFood(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
    unDeleteFood(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
}

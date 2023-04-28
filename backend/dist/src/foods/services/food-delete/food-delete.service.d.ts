import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class FoodDeleteService {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteFoodById(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
}

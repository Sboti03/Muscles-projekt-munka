import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class FoodUpdateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    updateFoodById(foodId: number, foodUpdateInput: Prisma.foodsUpdateInput): Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
}

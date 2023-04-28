import { PrismaService } from "../../../Common/utils/prirsma.service";
import { Prisma } from "@prisma/client";
export declare class FoodCreateService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createFood(foodsCreateInput: Prisma.foodsCreateInput): Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
}

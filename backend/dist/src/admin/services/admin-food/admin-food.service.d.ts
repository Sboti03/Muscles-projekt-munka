import { PrismaService } from "../../../Common/utils/prirsma.service";
import { FoodGetService } from "../../../foods/services/food-get/food-get.service";
import { FoodCheckService } from "../../../foods/services/food-check/food-check.service";
import SearchFoodQuery from "../../../foods/dto/SearchFood.query";
export declare class AdminFoodService {
    private prismaService;
    private foodGetService;
    private foodCheckService;
    constructor(prismaService: PrismaService, foodGetService: FoodGetService, foodCheckService: FoodCheckService);
    deleteFood(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
    unDeleteFood(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods, never>;
    getAllActiveFood(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    getAllFood(searchFoodQuery: SearchFoodQuery): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    getFoodById(foodId: number): Promise<import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    }>;
}

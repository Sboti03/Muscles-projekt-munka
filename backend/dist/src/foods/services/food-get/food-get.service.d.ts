import { PrismaService } from "../../../Common/utils/prirsma.service";
import SearchFoodQuery from "../../dto/SearchFood.query";
export declare class FoodGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getFoodById(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    }, never>;
    getAllActiveFood(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    foodSearch(take: number, skip: number): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
    getAllFood(searchFoodQuery: SearchFoodQuery): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
}

import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class FoodGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getFoodById(foodId: number): import(".prisma/client").Prisma.Prisma__foodsClient<import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    }, never>;
    getAllFood(): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").foods & {
        unit: import(".prisma/client").units;
    })[]>;
}

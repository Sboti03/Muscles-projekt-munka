import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class FoodCheckService {
    private prismaService;
    constructor(prismaService: PrismaService);
    checkValidFood(foodId: number): Promise<boolean>;
    isFoodDeleted(foodId: number): Promise<boolean>;
    isFoodExistByName(foodName: string): Promise<boolean>;
}

import { Injectable, Logger } from "@nestjs/common";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class FoodUpdateService {
    constructor(private prismaService:PrismaService) {}

    updateFoodById(foodId: number, foodUpdateInput: Prisma.foodsUpdateInput) {
        Logger.log(foodUpdateInput.saturatedFat)
        return this.prismaService.foods.update({
            where: {foodId},
            data: foodUpdateInput
        })
    }
}

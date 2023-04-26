import { Injectable, NotFoundException } from "@nestjs/common";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import { FoodGetService } from "../../../foods/services/food-get/food-get.service";
import { FoodCheckService } from "../../../foods/services/food-check/food-check.service";
import SearchFoodQuery from "../../../foods/dto/SearchFood.query";

@Injectable()
export class AdminFoodService {
    constructor(private prismaService: PrismaService,
                private foodGetService:FoodGetService,
                private foodCheckService:FoodCheckService) {
    }

    deleteFood(foodId: number) {
        return this.prismaService.foods.update({
            where: {
                foodId
            },
            data: {isDeleted: true}
        })
    }

    unDeleteFood(foodId: number) {
        return this.prismaService.foods.update({
            where: {
                foodId
            },
            data: {isDeleted: false}
        })
    }

    getAllActiveFood() {
        return this.foodGetService.getAllActiveFood();
    }


    getAllFood(searchFoodQuery:SearchFoodQuery) {
        return this.foodGetService.getAllFood(searchFoodQuery)
    }



    async getFoodById(foodId: number) {
        const isFoodExist = await this.foodCheckService.checkValidFood(foodId)
        if (!isFoodExist) {
            throw new NotFoundException("No food found")
        }
        return this.foodGetService.getFoodById(foodId)
    }
}

import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import SearchFoodQuery from "../../dto/SearchFood.query";

@Injectable()
export class FoodGetService {


    constructor(private prismaService: PrismaService) {}

    getFoodById(foodId: number) {
        return this.prismaService.foods.findUnique({
            where: {
                foodId
            },
            include: {
                unit: true
            }
        })
    }
    getAllActiveFood() {
        return this.prismaService.foods.findMany({
            where: {
                isDeleted: false
            },
            include: {
                unit: true
            }
        })
    }

    foodSearch(take: number, skip: number) {
        return this.prismaService.foods.findMany({
            take,
            skip,
            include: {
                unit: true
            }
        })
    }

    getAllFood(searchFoodQuery: SearchFoodQuery) {
        let skip = undefined
        let take = searchFoodQuery.max
        if (searchFoodQuery.page) {
            if (searchFoodQuery.max){
                skip = searchFoodQuery.max * searchFoodQuery.page
            } else {
                skip = 10 * searchFoodQuery.page
            }
        }
        return this.prismaService.foods.findMany({
            include: {
                unit: true
            },
            take,
            skip
        })
    }
}

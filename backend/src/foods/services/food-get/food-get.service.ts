import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

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

    getAllFood() {
        return this.prismaService.foods.findMany({
            where: {
                isDeleted: false
            },
            include: {
                unit: true
            }
        })
    }

    getAllFoodIncludingDeletedOnes() {
        return this.prismaService.foods.findMany({
            include: {
                unit: true
            }
        })
    }
}

import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class AdminFoodService {
    constructor(private prismaService: PrismaService) {
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





}

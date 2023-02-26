import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class FoodDeleteService {
    constructor(private prismaService:PrismaService) {}

    deleteFoodById(foodId: number) {
        return this.prismaService.foods.delete({
            where: {foodId}
        })
    }

}

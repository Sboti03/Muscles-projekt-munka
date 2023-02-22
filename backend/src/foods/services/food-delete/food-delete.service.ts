import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class FoodDeleteService {
    constructor(private prismaService:PrismaService) {}

    deleteFoodById(foodId: number) {
        return this.prismaService.foods.delete({
            where: {foodId}
        })
    }

}

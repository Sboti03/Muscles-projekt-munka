import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class FoodCheckService {

    constructor(private prismaService:PrismaService) {}

    async checkValidFood(foodId: number) {
        try {
            await this.prismaService.foods.findUnique({
                where: {foodId}
            })
            return true
        } catch (e) {
            return false
        }
    }
}

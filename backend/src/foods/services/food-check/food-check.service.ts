import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class FoodCheckService {

    constructor(private prismaService:PrismaService) {}

    async checkValidFood(foodId: number) {
        try {
            await this.prismaService.foods.findUniqueOrThrow({
                where: {foodId}
            })
            return true
        } catch (e) {
            return false
        }
    }

    async isFoodDeleted(foodId: number) {
        return (await this.prismaService.foods.findUniqueOrThrow({
            where: {foodId},
            select: {isDeleted: true}
        })).isDeleted
    }

    async isFoodExistByName(foodName: string) {
        try {
            await this.prismaService.foods.findUniqueOrThrow({
                where: {name: foodName}
            })
            return true
        } catch (e) {
            return false
        }
    }
}

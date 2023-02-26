import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class FoodCreateService {

    constructor(private prismaService:PrismaService) {}

    createFood(foodsCreateInput:Prisma.foodsCreateInput) {
        return this.prismaService.foods.create({
            data: foodsCreateInput
        })
    }

}

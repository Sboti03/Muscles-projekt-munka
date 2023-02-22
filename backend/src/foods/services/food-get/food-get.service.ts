import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class FoodGetService {


    constructor(private prismaService: PrismaService) {}


    getAllFood() {
        return this.prismaService.foods.findMany({
            include: {
                unit: true
            }
        })
    }
}

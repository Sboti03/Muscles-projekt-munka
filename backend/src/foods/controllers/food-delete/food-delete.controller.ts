import {Controller} from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Controller('food-delete')
export class FoodDeleteController {

    constructor(private prismaService: PrismaService) {
    }

    deleteFoodById(foodId: number) {
        return this.prismaService.foods.delete({
            where: {foodId}
        })
    }

}

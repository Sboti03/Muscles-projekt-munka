import {Body, Controller, Get, Query} from '@nestjs/common';
import {FoodSearchParam} from "../FoodSearchParams.dto";
import {FoodsService} from "../service/foods.service";

@Controller('foods')
export class FoodsController {
    constructor(private foodService: FoodsService) {
    }

    @Get('')
    async getAllFoods(@Query() foodSearchParam: FoodSearchParam) {
        return await this.foodService.getFoods(foodSearchParam);
    }
}

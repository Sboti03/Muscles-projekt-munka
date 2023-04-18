import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {FoodGetService} from "../../services/food-get/food-get.service";
import SearchFoodQuery from "../../dto/SearchFood.query";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('food')
@Controller('food')
@UseGuards(AccessTokenGuard)
export class FoodGetController {
    constructor(private foodGetService:FoodGetService) {
    }

    @Get()
    async getAllFood() {
        return this.foodGetService.getAllActiveFood();
    }

    @Get('search/')
    async searchFood(@Query() searchFoodQuery: SearchFoodQuery) {
        const take = searchFoodQuery.max
        const skip = searchFoodQuery.page * take
        return this.foodGetService.foodSearch(take, skip)
    }

}

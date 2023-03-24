import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {FoodGetService} from "../../services/food-get/food-get.service";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {IdParam} from "../../../Common/params/id.param";
import SearchFoodQuery from "../../dto/SearchFood.query";

@Controller('food')
@UseGuards(AccessTokenGuard)
export class FoodGetController {
    constructor(private foodGetService:FoodGetService) {
    }

    @Get()
    async getAllFood() {
        return this.foodGetService.getAllFood();
    }

    @Get('search/')
    async searchFood(@Query() searchFoodQuery: SearchFoodQuery) {

    }

    @Get(':id')
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    async getFoodById(@Param() idParam: IdParam) {
        return this.foodGetService.getFoodById(idParam.id);
    }

}

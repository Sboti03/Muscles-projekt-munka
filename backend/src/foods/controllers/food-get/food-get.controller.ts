import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {FoodGetService} from "../../services/food-get/food-get.service";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Role/utils/roles";

@Controller('food')
@UseGuards(AccessTokenGuard)
export class FoodGetController {
    constructor(private foodGetService:FoodGetService) {
    }

    @Get()
    async getAllFood() {
        return this.foodGetService.getAllFood();
    }

    @Get(':id')
    @Roles(RoleEnum.ADMIN)
    @UseGuards(RolesGuard)
    async getFoodById(@Param('id') id: number) {
        return this.foodGetService.getFoodById(id);
    }

}

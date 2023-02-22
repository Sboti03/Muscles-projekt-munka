import {Controller, Param, Post, UseGuards} from '@nestjs/common';
import {FoodUpdateService} from "../../services/food-update/food-update.service";
import {Roles} from "../../../Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Role/utils/roles";
import {JwtAccessGuard} from "../../../auth/guards/jwt-access.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {FoodUpdateDto} from "../../dto/food-update.dto";
import {FoodConvertService} from "../../services/food-convert/food-convert.service";


@Roles(RoleEnum.ADMIN)
@UseGuards(JwtAccessGuard, RolesGuard)
@Controller('food')
export class FoodUpdateController {
    constructor(private foodUpdateService:FoodUpdateService,
                private foodConvertService: FoodConvertService) {}

    @Post('/update/:id')
    async updateFoodById(@Param('id') foodId: number, foodUpdateDto: FoodUpdateDto) {
        const foodUpdateInput = this.foodConvertService.convertUpdateDtoToInput(foodUpdateDto)
        return this.foodUpdateService.updateFoodById(foodId, foodUpdateInput)
    }
}

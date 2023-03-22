import {Body, Controller, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {FoodUpdateService} from "../../services/food-update/food-update.service";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {FoodUpdateDto} from "../../dto/food-update.dto";
import {FoodConvertService} from "../../services/food-convert/food-convert.service";
import {IdParam} from "../../../Common/params/id.param";


@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('food')
export class FoodUpdateController {
    constructor(private foodUpdateService:FoodUpdateService,
                private foodConvertService: FoodConvertService) {}

    // @Patch('/:id')
    // async updateFoodById(@Param() idParam: IdParam,@Body() foodUpdateDto: FoodUpdateDto) {
    //     const foodUpdateInput = this.foodConvertService.convertUpdateDtoToInput(foodUpdateDto)
    //     return this.foodUpdateService.updateFoodById(idParam.id, foodUpdateInput)
    // }
}

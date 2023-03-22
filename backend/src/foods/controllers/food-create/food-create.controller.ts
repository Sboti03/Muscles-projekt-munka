import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {FoodCreateService} from "../../services/food-create/food-create.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {FoodCreateDto} from "../../dto/food-create.dto";
import {FoodGetService} from "../../services/food-get/food-get.service";
import {FoodConvertService} from "../../services/food-convert/food-convert.service";

@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('food')
export class FoodCreateController {
    constructor(private foodCreateService:FoodCreateService,
                private convertService:FoodConvertService) {}

    // @Post('/')
    // async createFood(@Body() foodCreateDto: FoodCreateDto) {
    //     const foodCreateInput = this.convertService.convertCreateDtoToInput(foodCreateDto)
    //     return this.foodCreateService.createFood(foodCreateInput)
    // }



}

import {Controller, Post, UseGuards} from '@nestjs/common';
import {FoodCreateService} from "../../services/food-create/food-create.service";
import {JwtAccessGuard} from "../../../auth/guards/jwt-access.guard";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {Roles} from "../../../Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Role/utils/roles";
import {FoodCreateDto} from "../../dto/food-create.dto";
import {FoodGetService} from "../../services/food-get/food-get.service";
import {FoodConvertService} from "../../services/food-convert/food-convert.service";

@Roles(RoleEnum.ADMIN)
@UseGuards(JwtAccessGuard, RolesGuard)
@Controller('food-create')
export class FoodCreateController {
    constructor(private foodCreateService:FoodCreateService,
                private convertService:FoodConvertService) {}

    @Post('create')
     async createFood(foodCreateDto: FoodCreateDto) {
        const foodCreateInput = this.convertService.convertCreateDtoToInput(foodCreateDto)
        return this.foodCreateService.createFood(foodCreateInput)
    }



}

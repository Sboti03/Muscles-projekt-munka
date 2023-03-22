import {
    Body,
    Controller,
    Delete,
    ImATeapotException,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {AdminFoodService} from "../../services/admin-food/admin-food.service";
import {IdParam} from "../../../Common/params/id.param";
import {FoodCheckService} from "../../../foods/services/food-check/food-check.service";
import {FoodCreateDto} from "../../../foods/dto/food-create.dto";
import {FoodConvertService} from "../../../foods/services/food-convert/food-convert.service";
import {FoodCreateService} from "../../../foods/services/food-create/food-create.service";
import {FoodUpdateDto} from "../../../foods/dto/food-update.dto";
import {FoodUpdateService} from "../../../foods/services/food-update/food-update.service";


@UseGuards(AccessTokenGuard)
@Roles(RoleEnum.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/food')
export class AdminFoodController {
    constructor(
        private adminFoodService: AdminFoodService,
        private foodService: FoodCheckService,
        private convertService: FoodConvertService,
        private foodCreateService: FoodCreateService,
        private foodUpdateService: FoodUpdateService) {
    }

    @Delete(':id')
    deleteFood(@Param() idParam: IdParam) {
        const isFoodExist = this.foodService.checkValidFood(idParam.id)
        if (!isFoodExist) throw new NotFoundException('No food found')
        const isFoodDeleted = this.foodService.isFoodDeleted(idParam.id)
        if (isFoodDeleted) throw new ImATeapotException('Food is deleted already')
        return this.adminFoodService.deleteFood(idParam.id)
    }

    @Patch('undelete/:id')
    unDeleteFood(@Param() idParam: IdParam) {
        const isFoodExist = this.foodService.checkValidFood(idParam.id)
        if (!isFoodExist) throw new NotFoundException('No food found')
        const isFoodDeleted = this.foodService.isFoodDeleted(idParam.id)
        if (!isFoodDeleted) throw new ImATeapotException('Food is not deleted')
        return this.adminFoodService.unDeleteFood(idParam.id)
    }

    @Post('/')
    async createFood(@Body() foodCreateDto: FoodCreateDto) {
        const isFoodExist = this.foodService.isFoodExistByName(foodCreateDto.name)
        if (isFoodExist) throw new NotFoundException(`Food already exist with this name ${foodCreateDto.name}`)
        const foodCreateInput = this.convertService.convertCreateDtoToInput(foodCreateDto)
        return this.foodCreateService.createFood(foodCreateInput)
    }


    @Patch('/:id')
    async updateFoodById(@Param() idParam: IdParam, @Body() foodUpdateDto: FoodUpdateDto) {
        const isFoodExist = this.foodService.checkValidFood(idParam.id)
        if (!isFoodExist) throw new NotFoundException('No food found')
        const foodUpdateInput = this.convertService.convertUpdateDtoToInput(foodUpdateDto)
        return this.foodUpdateService.updateFoodById(idParam.id, foodUpdateInput)
    }


}

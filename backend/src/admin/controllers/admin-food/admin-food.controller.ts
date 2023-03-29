import {
    Body,
    Controller,
    Delete, Get,
    ImATeapotException, Logger,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards
} from "@nestjs/common";
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


@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
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
    async deleteFood(@Param() idParam: IdParam) {
        const isFoodExist = await this.foodService.checkValidFood(idParam.id)
        if (!isFoodExist) throw new NotFoundException('No food found')
        const isFoodDeleted = await this.foodService.isFoodDeleted(idParam.id)
        if (isFoodDeleted) throw new ImATeapotException('Food is deleted already')
        return this.adminFoodService.deleteFood(idParam.id)
    }

    @Patch('undelete/:id')
    async unDeleteFood(@Param() idParam: IdParam) {
        const isFoodExist = await this.foodService.checkValidFood(idParam.id)
        if (!isFoodExist) throw new NotFoundException('No food found')
        const isFoodDeleted = await this.foodService.isFoodDeleted(idParam.id)
        if (!isFoodDeleted) throw new ImATeapotException('Food is not deleted')
        return this.adminFoodService.unDeleteFood(idParam.id)
    }

    @Post('/')
    async createFood(@Body() foodCreateDto: FoodCreateDto) {
        const isFoodExist = await this.foodService.isFoodExistByName(foodCreateDto.name)
        if (isFoodExist) throw new NotFoundException(`Food already exist with this name ${foodCreateDto.name}`)
        const foodCreateInput = await this.convertService.convertCreateDtoToInput(foodCreateDto)
        return this.foodCreateService.createFood(foodCreateInput)
    }


    @Patch('/:id')
    async updateFoodById(@Param() idParam: IdParam, @Body() foodUpdateDto: FoodUpdateDto) {
        Logger.debug(`Updating food - foodId: ${idParam.id}`)
        const isFoodExist = await this.foodService.checkValidFood(idParam.id)
        Logger.debug(`Food is ${isFoodExist ? '' : 'not'} exit with ${idParam.id} id`)
        if (!isFoodExist) throw new NotFoundException('No food found')
        const foodUpdateInput = this.convertService.convertUpdateDtoToInput(foodUpdateDto)
        Logger.debug(`New values is `)
        const keys = Object.keys(foodUpdateInput)
        const values = Object.values(foodUpdateInput)
        for (let i = 0; i < keys.length; i++) {
            if (values[i]) {
                Logger.debug(`${keys[i]}: ${values[i]}`)
            }
        }


        return this.foodUpdateService.updateFoodById(idParam.id, foodUpdateInput)
    }

    @Get()
    async getAllFood() {
        return this.adminFoodService.getAllActiveFood();
    }

    @Get(':id')
    async getFoodById(@Param() idParam: IdParam) {
        return this.adminFoodService.getFoodById(idParam.id)
    }

}

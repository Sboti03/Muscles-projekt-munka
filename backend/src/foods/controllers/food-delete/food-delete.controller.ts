import {Controller, Delete, ImATeapotException, Param, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {Roles} from "../../../Common/Role/decorators/ roles.decorator";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {RolesGuard} from "../../../auth/guards/role.guard";
import {FoodDeleteService} from "../../services/food-delete/food-delete.service";
import {FoodCheckService} from "../../services/food-check/food-check.service";

@Roles(RoleEnum.ADMIN)
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('food')
export class FoodDeleteController {
    constructor(private foodDeleteService:FoodDeleteService,
                private checkService:FoodCheckService) {
    }

    @Delete('/:id')
    async deleteFood(@Param('id') id: number) {
        if (await this.checkService.checkValidFood(id)) {
            return this.foodDeleteService.deleteFoodById(id)
        } else {
            throw new ImATeapotException('No food found')
        }

    }

}

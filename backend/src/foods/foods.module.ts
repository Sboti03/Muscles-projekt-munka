import {Module} from '@nestjs/common';
import {FoodGetController} from './controllers/food-get/food-get.controller';
import {FoodUpdateController} from './controllers/food-update/food-update.controller';
import {FoodCreateController} from './controllers/food-create/food-create.controller';
import {FoodDeleteController} from './controllers/food-delete/food-delete.controller';
import {FoodDeleteService} from './services/food-delete/food-delete.service';
import {FoodCreateService} from './services/food-create/food-create.service';
import {FoodCheckService} from './services/food-check/food-check.service';
import {FoodUpdateService} from './services/food-update/food-update.service';
import {FoodGetService} from './services/food-get/food-get.service';
import {PrismaService} from "../utils/prirsma.service";
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";
import {RolesGuard} from "../auth/guards/role.guard";
import { FoodConvertService } from './services/food-convert/food-convert.service';

@Module({
    controllers: [FoodGetController, FoodUpdateController, FoodCreateController, FoodDeleteController],
    providers: [
        FoodDeleteService,
        FoodGetService,
        FoodUpdateService,
        FoodCheckService,
        FoodCreateService,
        PrismaService,
        JwtAccessGuard,
        RolesGuard,
        FoodConvertService,
    ]
})
export class FoodsModule {
}

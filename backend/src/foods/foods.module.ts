import {Module} from '@nestjs/common';
import {FoodGetController} from './controllers/food-get/food-get.controller';
import {FoodCreateController} from './controllers/food-create/food-create.controller';
import {FoodDeleteController} from './controllers/food-delete/food-delete.controller';
import {FoodDeleteService} from './services/food-delete/food-delete.service';
import {FoodCreateService} from './services/food-create/food-create.service';
import {FoodCheckService} from './services/food-check/food-check.service';
import {FoodUpdateService} from './services/food-update/food-update.service';
import {FoodGetService} from './services/food-get/food-get.service';
import {PrismaService} from "../Common/utils/prirsma.service";
import {AccessTokenGuard} from "../auth/guards/access-token.guard";
import {RolesGuard} from "../auth/guards/role.guard";
import {FoodConvertService} from './services/food-convert/food-convert.service';

@Module({
    controllers: [FoodGetController, FoodCreateController, FoodDeleteController],
    providers: [
        FoodDeleteService,
        FoodGetService,
        FoodUpdateService,
        FoodCheckService,
        FoodCreateService,
        PrismaService,
        AccessTokenGuard,
        RolesGuard,
        FoodConvertService,
    ],
    exports: [FoodCheckService, FoodCreateService, FoodDeleteService,
        FoodGetService,
        FoodUpdateService,
        FoodCheckService,
        FoodCreateService, FoodConvertService]
})
export class FoodsModule {
}

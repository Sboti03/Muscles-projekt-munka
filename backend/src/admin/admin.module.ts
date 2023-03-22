import {Module} from '@nestjs/common';
import {AdminBlockService} from "./services/admin-block/admin-block.service";
import {AdminDeleteService} from "./services/admin-delete/admin-delete.service";
import {PrismaService} from "../Common/utils/prirsma.service";
import {AdminUserController} from "./controllers/admin-user/admin-user.controller";
import { AdminFoodController } from './controllers/admin-food/admin-food.controller';
import { AdminFoodService } from './services/admin-food/admin-food.service';
import {FoodsModule} from "../foods/foods.module";

@Module({
    imports: [FoodsModule],
    providers: [
        AdminBlockService,
        AdminDeleteService,
        PrismaService,
        AdminFoodService,
    ],
    controllers: [
        AdminUserController,
        AdminFoodController,
    ],
    exports: [
        AdminBlockService,
        AdminDeleteService,
        PrismaService,
    ]
})
export class AdminModule {
}

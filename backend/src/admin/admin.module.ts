import {Module} from '@nestjs/common';
import {AdminBlockService} from "./services/admin-block/admin-block.service";
import {AdminDeleteService} from "./services/admin-delete/admin-delete.service";
import {PrismaService} from "../Common/utils/prirsma.service";
import {AdminUserController} from "./controllers/admin-user/admin-user.controller";
import { AdminFoodController } from './controllers/admin-food/admin-food.controller';
import { AdminFoodService } from './services/admin-food/admin-food.service';
import {FoodsModule} from "../foods/foods.module";
import { AdminProfileController } from './controllers/admin-profile/admin-profile.controller';
import { ProfileGetService } from "../profile/services/profile-get/profile-get.service";
import { UserGetService } from "../user/services/user-get/user-get.service";

@Module({
    imports: [FoodsModule],
    providers: [
        AdminBlockService,
        AdminDeleteService,
        PrismaService,
        AdminFoodService,
        ProfileGetService,
        UserGetService
    ],
    controllers: [
        AdminUserController,
        AdminFoodController,
        AdminProfileController,
    ],
    exports: [
        AdminBlockService,
        AdminDeleteService,
        PrismaService,
    ]
})
export class AdminModule {
}

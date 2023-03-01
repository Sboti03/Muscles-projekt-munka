import {Module} from '@nestjs/common';
import {MealCreateService} from './services/meal-create/meal-create.service';
import {MealController} from "./controller/meal.controller";
import {MealConvertService} from "./services/meal-convert/meal-convert.service";
import {MealUpdateService} from "./services/meal-update/meal-update.service";
import {MealDeleteService} from "./services/meal-delete/meal-delete.service";
import {PrismaService} from "../Common/utils/prirsma.service";
import {MealGetService} from "./services/meal-get/meal-get.service";

@Module({
    providers: [
        MealCreateService,
        MealGetService,
        MealUpdateService,
        MealDeleteService,
        PrismaService
    ],
    exports: [
        PrismaService,
        MealCreateService,
        MealGetService,
        MealUpdateService,
        MealDeleteService,
        MealCreateService,
    ],
    controllers: [MealController]
})
export class MealModule {
}

import {Module} from '@nestjs/common';
import {DayHistoryCreateService} from './services/day-history-create/day-history-create.service';
import {PrismaService} from "../Common/utils/prirsma.service";
import {DayHistoryGetService} from "./services/day-history-get/day-history-get.service";
import {DayHistoryGetController} from "./controllers/day-history-get/day-history-get.controller";
import {DayHistoryCheckService} from "./services/day-history-check/day-history-check.service";
import {GoalsModule} from "../goals/goals.module";
import {WeightHistoryModule} from "../weight-history/weight-history.module";
import {MealModule} from "../meal/meal.module";
import {MealHistoryModule} from "../meal-history/meal-history.module";

@Module({
    imports: [],
    providers: [
        DayHistoryCreateService,
        DayHistoryGetService,
        PrismaService,
        DayHistoryCheckService
    ],
    controllers: [
        DayHistoryGetController
    ],
    exports: [
        DayHistoryCreateService,
        DayHistoryGetService,
        PrismaService,
        DayHistoryCheckService
    ],
})
export class DayHistoryModule {

}

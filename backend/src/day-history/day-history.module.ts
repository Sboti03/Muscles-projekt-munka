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
import { DayHistoryController } from './controllers/day-history/day-history.controller';
import {ConnectionCheckService} from "../Connections/connection/services/connection-check/connection-check.service";
import {ConnectionModule} from "../Connections/connection/connection.module";

@Module({
    imports: [ConnectionModule],
    providers: [
        DayHistoryCreateService,
        DayHistoryGetService,
        PrismaService,
        DayHistoryCheckService
    ],
    controllers: [
        DayHistoryGetController,
        DayHistoryController
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

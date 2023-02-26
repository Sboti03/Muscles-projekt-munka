import {Module} from '@nestjs/common';
import {PrismaService} from "../Common/utils/prirsma.service";
import {
    WeightHistoryUpdateOrCreateService
} from "./services/weight-history-update-or-create/weight-history-update-or-create.service";
import {WeightHistoryController} from "./controller/weight-history-create-or-update/weight-history.controller";
import {DayHistoryGetService} from "../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCreateService} from "../day-history/services/day-history-create/day-history-create.service";

@Module({
    providers: [
        WeightHistoryUpdateOrCreateService,
        PrismaService,
        DayHistoryCreateService,
        DayHistoryGetService,
    ],
    controllers: [WeightHistoryController],
    exports: [
        WeightHistoryUpdateOrCreateService,
        PrismaService,
        DayHistoryGetService,
        DayHistoryCreateService
    ]
})
export class WeightHistoryModule {

}

import {Module} from '@nestjs/common';
import {PrismaService} from "../Common/utils/prirsma.service";
import {
    WeightHistoryUpdateOrCreateService
} from "./services/weight-history-update-or-create/weight-history-update-or-create.service";
import {WeightHistoryController} from "./controller/weight-history-create-or-update/weight-history.controller";
import {DayHistoryGetService} from "../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCreateService} from "../day-history/services/day-history-create/day-history-create.service";
import { WeightHistoryGetService } from './services/weight-history-get/weight-history-get.service';
import {DayHistoryModule} from "../day-history/day-history.module";
import {DayHistoryCreateDto} from "../day-history/dto/DayHistoryCreate.dto";
import { WeightHistoryGetController } from './controller/weight-history-get/weight-history-get.controller';

@Module({
    providers: [
        WeightHistoryUpdateOrCreateService,
        PrismaService,
        DayHistoryGetService,
        DayHistoryCreateService,
        WeightHistoryGetService,
    ],
    controllers: [WeightHistoryController, WeightHistoryGetController],
    exports: [
        WeightHistoryUpdateOrCreateService,
        PrismaService,
        WeightHistoryGetService
    ]
})
export class WeightHistoryModule {

}

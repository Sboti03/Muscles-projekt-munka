import {Module} from '@nestjs/common';
import {DayHistoryCreateService} from './services/day-history-create/day-history-create.service';
import {PrismaService} from "../utils/prirsma.service";
import {DayHistoryGetService} from "./services/day-history-get/day-history-get.service";
import {DayHistoryCheckService} from "./services/day-history-check/day-history-check.service";

@Module({
    providers: [
        DayHistoryCreateService,
        DayHistoryGetService,
        PrismaService,
        DayHistoryCheckService
    ],
    exports: [
        DayHistoryCreateService,
        DayHistoryGetService,
        PrismaService,
        DayHistoryCheckService
    ]
})
export class DayHistoryModule {

}

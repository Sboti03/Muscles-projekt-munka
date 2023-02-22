import {Module} from '@nestjs/common';
import {DayHistoryCreateService} from './services/day-history-create/day-history-create.service';
import {PrismaService} from "../utils/prirsma.service";
import {DayHistoryGetService} from "./services/day-history-get/day-history-get.service";

@Module({
    providers: [
        DayHistoryCreateService,
        DayHistoryGetService,
        PrismaService
    ],
    exports: [
        DayHistoryCreateService,
        DayHistoryGetService
    ]
})
export class DayHistoryModule {

}

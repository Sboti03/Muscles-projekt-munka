import { Module } from '@nestjs/common';
import {PrismaService} from "../utils/prirsma.service";
import {
    WeightHistoryUpdateService
} from "./services/weight-history-update/weight-history-update/weight-history-update.service";
import {WeightHistoryCreateService} from "./services/weight-history-create/weight-history-create.service";

@Module({
    providers: [
        WeightHistoryCreateService,
        WeightHistoryUpdateService,
        PrismaService
    ],
    exports: [
        WeightHistoryCreateService,
        WeightHistoryUpdateService,
        PrismaService
    ]
})
export class WeightHistoryModule {

}

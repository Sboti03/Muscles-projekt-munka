import { Module } from '@nestjs/common';
import {PrismaService} from "../utils/prirsma.service";
import {
    WeightHistoryUpdateOrCreateService
} from "./services/weight-history-update-or-create/weight-history-update-or-create.service";
import {WeightHistoryCreateService} from "./services/weight-history-create/weight-history-create.service";

@Module({
    providers: [
        WeightHistoryCreateService,
        WeightHistoryUpdateOrCreateService,
        PrismaService
    ],
    exports: [
        WeightHistoryCreateService,
        WeightHistoryUpdateOrCreateService,
        PrismaService
    ]
})
export class WeightHistoryModule {

}

import {Module} from '@nestjs/common';
import {PrismaService} from "../utils/prirsma.service";
import {
    WeightHistoryUpdateOrCreateService
} from "./services/weight-history-update-or-create/weight-history-update-or-create.service";

@Module({
    providers: [
        WeightHistoryUpdateOrCreateService,
        PrismaService
    ],
    exports: [
        WeightHistoryUpdateOrCreateService,
        PrismaService
    ]
})
export class WeightHistoryModule {

}

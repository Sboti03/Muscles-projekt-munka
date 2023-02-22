import {Module} from '@nestjs/common';
import {DayHistoryService} from './services/day-history.service';
import {PrismaService} from "../utils/prirsma.service";
import {APP_GUARD} from "@nestjs/core";
import {JwtAccessGuard} from "../auth/guards/jwt-access.guard";

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAccessGuard
        },
        DayHistoryService,
        PrismaService
    ]
})
export class DayHistoryModule {

}

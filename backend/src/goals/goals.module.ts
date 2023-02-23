import {Module} from '@nestjs/common';
import {GoalsUpdateService} from './services/goals-update/goals-update.service';
import {GoalsGetService} from './services/goals-get/goals-get.service';
import {GoalsConvertService} from './services/goals-convert/goals-convert.service';
import {GoalsUpdateController} from './controllers/goals-update/goals-update.controller';
import {GoalsGetController} from './controllers/goals-get/goals-get.controller';
import {PrismaService} from "../utils/prirsma.service";
import {GoalsCheckService} from "./services/goals-check/goals-check.service";
@Module({
    controllers: [
        GoalsUpdateController,
        GoalsGetController
    ],
    providers: [
        GoalsGetService,
        GoalsUpdateService,
        GoalsConvertService,
        PrismaService,
        GoalsCheckService
    ],
    exports: [
        GoalsGetService,
        GoalsUpdateService,
        GoalsConvertService,
        PrismaService,
        GoalsCheckService
    ]
})
export class GoalsModule {
}

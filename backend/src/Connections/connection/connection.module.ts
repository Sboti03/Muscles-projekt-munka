import {Module} from '@nestjs/common';
import {ConnectionGetService} from './services/connection-get/connection-get.service';
import {ConnectionCheckService} from './services/connection-check/connection-check.service';
import {PrismaService} from "../../Common/utils/prirsma.service";
import {ConnectionCreateController} from './controllers/connection-create/connection-create.controller';
import {ConnectionCreateService} from './services/connection-create/connection-create.service';
import {ConnectionGetController} from './controllers/connection-get/connection-get.controller';
import {ConnectionDeleteController} from './controllers/connection-delete/connection-delete.controller';
import {ProfileModule} from "../../profile/profile.module";
import {ConnectionRequestModule} from "../connection-request/connection-request.module";
import {ConnectionDeleteService} from './services/connection-delete/connection-delete.service';

@Module({
    imports: [ProfileModule, ConnectionRequestModule],
    providers: [ConnectionGetService, ConnectionCheckService, PrismaService, ConnectionCreateService, ConnectionDeleteService],
    exports: [ConnectionGetService, ConnectionCheckService, ConnectionCreateService, ConnectionDeleteService],
    controllers: [ConnectionCreateController, ConnectionGetController, ConnectionDeleteController]
})
export class ConnectionModule {
}

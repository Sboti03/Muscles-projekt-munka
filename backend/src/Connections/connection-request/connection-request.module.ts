import {Module} from '@nestjs/common';
import {
    ConnectionRequestCreateController
} from './controllers/connection-request-create/connection-request-create.controller';
import {ConnectionRequestGetService} from './services/connection-request-get/connection-request-get.service';
import {ConnectionRequestCheckService} from './services/connection-request-check/connection-request-check.service';
import {ConnectionRequestDeleteService} from './services/connection-request-delete/connection-request-delete.service';
import {PrismaService} from "../../Common/utils/prirsma.service";
import {ConnectionRequestCreateService} from './services/connection-request-create/connection-request-create.service';
import {ConnectionModule} from "../connection/connection.module";

@Module({
    imports: [ConnectionModule],
    controllers: [ConnectionRequestCreateController],
    providers: [
        PrismaService,
        ConnectionRequestGetService,
        ConnectionRequestCheckService,
        ConnectionRequestDeleteService,
        ConnectionRequestCreateService,
    ]
})
export class ConnectionRequestModule {
}

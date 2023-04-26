import {Module} from '@nestjs/common';
import {
    ConnectionRequestCreateController
} from './controllers/connection-request-create/connection-request-create.controller';
import {ConnectionRequestGetService} from './services/connection-request-get/connection-request-get.service';
import {ConnectionRequestCheckService} from './services/connection-request-check/connection-request-check.service';
import {ConnectionRequestDeleteService} from './services/connection-request-delete/connection-request-delete.service';
import {PrismaService} from "../../Common/utils/prirsma.service";
import {ConnectionRequestCreateService} from './services/connection-request-create/connection-request-create.service';
import {
    ConnectionRequestDeleteController
} from "./controllers/connection-request-delete/connection-request-delete.controller";
import {ConnectionRequestGetController} from "./controllers/connection-request-get/connection-request-get.controller";
import {ConnectionCheckService} from "../connection/services/connection-check/connection-check.service";
import {ConnectionGetService} from "../connection/services/connection-get/connection-get.service";
import { UserModule } from "../../user/user.module";

@Module({
    imports: [UserModule],
    controllers: [ConnectionRequestDeleteController, ConnectionRequestGetController, ConnectionRequestCreateController],
    providers: [
        PrismaService,
        ConnectionRequestGetService,
        ConnectionRequestCheckService,
        ConnectionRequestDeleteService,
        ConnectionRequestCreateService,
        ConnectionCheckService,
        ConnectionGetService,

    ],
    exports: [
        ConnectionRequestGetService,
        ConnectionRequestCheckService,
        ConnectionRequestDeleteService,
        ConnectionRequestCreateService,]
})
export class ConnectionRequestModule {
}

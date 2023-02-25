import { Module } from '@nestjs/common';
import { ConnectionRequestCreateController } from './controllers/connection-request-create/connection-request-create.controller';
import { ConnectionRequestService } from './services/connection-request/connection-request.service';
import { ConnectionRequestGetService } from './services/connection-request-get/connection-request-get.service';
import { ConnectionRequestCheckService } from './services/connection-request-check/connection-request-check.service';
import { ConnectionRequestDeleteService } from './services/connection-request-delete/connection-request-delete.service';
import {PrismaService} from "../utils/prirsma.service";
import { ConnectionRequestCreateService } from './services/connection-request-create/connection-request-create.service';

@Module({
  controllers: [ConnectionRequestCreateController],
  providers: [
      PrismaService,
      ConnectionRequestService,
      ConnectionRequestGetService,
      ConnectionRequestCheckService,
      ConnectionRequestDeleteService,
      ConnectionRequestCreateService]
})
export class ConnectionRequestModule {}

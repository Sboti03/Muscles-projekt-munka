import { Module } from '@nestjs/common';
import { ConnectionRequestController } from './controllers/connection-request/connection-request.controller';
import { ConnectionRequestService } from './services/connection-request/connection-request.service';
import { ConnectionRequestGetService } from './services/connection-request-get/connection-request-get.service';
import { ConnectionRequestCheckService } from './services/connection-request-check/connection-request-check.service';
import { ConnectionRequestDeleteService } from './services/connection-request-delete/connection-request-delete.service';
import {PrismaService} from "../utils/prirsma.service";

@Module({
  controllers: [ConnectionRequestController],
  providers: [
      PrismaService,
      ConnectionRequestService,
      ConnectionRequestGetService,
      ConnectionRequestCheckService,
      ConnectionRequestDeleteService]
})
export class ConnectionRequestModule {}

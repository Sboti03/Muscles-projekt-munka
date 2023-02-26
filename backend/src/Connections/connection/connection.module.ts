import { Module } from '@nestjs/common';
import { ConnectionGetService } from './services/connection-get/connection-get.service';
import { ConnectionCheckService } from './services/connection-check/connection-check.service';
import {PrismaService} from "../../Common/utils/prirsma.service";

@Module({
  providers: [ConnectionGetService, ConnectionCheckService, PrismaService],
  exports: [ConnectionGetService, ConnectionCheckService]
})
export class ConnectionModule {}

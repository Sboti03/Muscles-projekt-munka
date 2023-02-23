import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import {PrismaService} from "../utils/prirsma.service";

@Module({
  controllers: [InitController],
  providers: [InitService, PrismaService]
})
export class InitModule {}

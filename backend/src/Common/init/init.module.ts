import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import {PrismaService} from "../utils/prirsma.service";
import {AuthService} from "../../auth/services/auth.service";
import {AuthModule} from "../../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [InitController],
  providers: [InitService, PrismaService]
})
export class InitModule {}

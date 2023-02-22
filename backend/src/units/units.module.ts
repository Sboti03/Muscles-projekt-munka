import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import {PrismaService} from "../utils/prirsma.service";

@Module({
  providers: [UnitsService, PrismaService],
  controllers: [UnitsController]
})
export class UnitsModule {}

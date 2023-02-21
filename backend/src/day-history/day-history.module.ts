import { Module } from '@nestjs/common';
import { DayHistoryService } from './services/day-history.service';

@Module({
  providers: [DayHistoryService]
})
export class DayHistoryModule {

}

import { Module } from '@nestjs/common';
import { DayHistoryService } from './controllers/service/day-history.service';

@Module({
  providers: [DayHistoryService]
})
export class DayHistoryModule {

}

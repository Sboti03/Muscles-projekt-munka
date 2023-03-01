import {Injectable} from '@nestjs/common';

import {DayHistoryGetService} from "../day-history-get/day-history-get.service";
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class DayHistoryCheckService {
   constructor(private prismaService: PrismaService,
               private dayHistoryGetService: DayHistoryGetService) {
   }

   async checkExistingDayHistory(profileId: number, date: Date) {
      try {
         await this.dayHistoryGetService.getDayIdByDate(date, profileId);
         return true;
      }catch (e){
         return false;
      }
   }
}
import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {DayHistoryGetService} from "../day-history-get/day-history-get.service";

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
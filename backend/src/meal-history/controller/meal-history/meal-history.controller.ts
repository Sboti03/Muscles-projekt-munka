import {Controller, ForbiddenException, Post} from '@nestjs/common';
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {PrismaService} from "../../../utils/prirsma.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {MealHistoryCreateService} from "../../services/meal-history-create/meal-history-create.service";
import {MealHistoryConvertService} from "../../services/meal-history-convert/meal-history-convert.service";

@Controller('meal-history')
export class MealHistoryController {

   constructor(private prismaService: PrismaService,
               private dayHistoryGetService: DayHistoryGetService,
               private mealHistoryCreateService: MealHistoryCreateService,
               private mealHistoryConvertService: MealHistoryConvertService) {}

   @Post('/create')
   async createMealHistory(date: Date, foodId: number, periodName: string, @GetCurrentUserProfileId() profileId: number){
      if (profileId === -1) {
         throw new ForbiddenException('This profile does not exist');
      }
      const dayId = this.prismaService.dayHistory.upsert({
         update: undefined,
         where: {
            dayId_profileId: {
               profileId,
               dayId: (await this.dayHistoryGetService.getDayIdByDate(date, profileId)).dayId
            }
         },
         create: {
            date,
            profileId
         },
         select: {
            dayId: true
         }
      });
      const mealHistoryInput = this.mealHistoryConvertService.convertMealHistoryDtoToInput(dayId,mealId)
   }
}

import {Injectable, UseGuards} from '@nestjs/common';
import {CreateMealHistoryDTO} from "../../dto/createMealHistoryDTO";
import {Prisma} from "@prisma/client";
import {MealHistoryGetService} from "../meal-history-get/meal-history-get.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";


@Injectable()
export class MealHistoryConvertService {

   constructor(private mealHistoryGetService: MealHistoryGetService,
               private dayHistoryGetService: DayHistoryGetService) {
   }
   @UseGuards()
   async convertMealHistoryDtoToInput(createMealHistoryDTO: CreateMealHistoryDTO, @GetCurrentUserProfileId() profileId: number): Promise<Prisma.mealHistoryCreateInput>{
      return {
         day: {
            connect: {
               dayId: (await this.dayHistoryGetService.getDayIdByDate(createMealHistoryDTO.date, profileId)).dayId
            }
         },
         mealPeriod: {
            connect: {
               periodName: createMealHistoryDTO.periodName
            }
         },
         meals: {
            connect: {
               mealId: (await this.mealHistoryGetService.getMealHistoryMealId(
                  (await this.dayHistoryGetService.getDayIdByDate(createMealHistoryDTO.date, profileId)).dayId,
                  createMealHistoryDTO.periodName,
                  createMealHistoryDTO.foodId)).mealId
            }
         }
      }
   }
}

import { Injectable } from '@nestjs/common';
import {CreateMealHistoryDTO} from "../../dto/createMealHistoryDTO";
import {Prisma} from "@prisma/client";
import {MealHistoryGetService} from "../meal-history-get/meal-history-get.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {JwtPayload} from "../../../auth/types/jwt-payload";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class MealHistoryConvertService {

   constructor(private mealHistoryGetService: MealHistoryGetService,
               private dayHistoryGetService: DayHistoryGetService) {
   }
   convertMealHistoryDtoToInput(createMealHistoryDTO: CreateMealHistoryDTO): Prisma.mealHistoryCreateInput{
      return {
         day: this.dayHistoryGetService.getDayIdByDate()
      }
   }
}

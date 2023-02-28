import {Injectable} from '@nestjs/common';
import {CreateMealHistoryDTO} from "../../dto/createMealHistoryDTO";
import {Prisma} from "@prisma/client";


@Injectable()
export class MealHistoryConvertService {

   constructor() {}
   async convertMealHistoryDtoToInput(dayId: number, mealId: number, createMealHistoryDTO: CreateMealHistoryDTO): Promise<Prisma.mealHistoryCreateInput>{
      return {

         day: {
            connect: {
               dayId
            }
         },
         mealPeriod: {
            connect: {
               periodName: createMealHistoryDTO.periodName
            }
         },
         meals: {
            connect: {
               mealId
            }
         }
      }
   }
}

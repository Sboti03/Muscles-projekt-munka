import {Injectable, UseGuards} from '@nestjs/common';
import {CreateMealHistoryDTO} from "../../dto/createMealHistoryDTO";
import {Prisma} from "@prisma/client";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";


@Injectable()
export class MealHistoryConvertService {

   constructor() {}
   @UseGuards()
   async convertMealHistoryDtoToInput(dayId: number, mealId: number, createMealHistoryDTO: CreateMealHistoryDTO, @GetCurrentUserProfileId() profileId: number): Promise<Prisma.mealHistoryCreateInput>{
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

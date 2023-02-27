import { Injectable } from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {CreateMealHistoryDTO} from "../../../meal-history/dto/createMealHistoryDTO";
import {RoleEnum} from "../../../Role/utils/roles";

@Injectable()
export class MealConvertService {
   constructor() {}

   convertMealCreateDtoToInput(createMealHistoryDTO: CreateMealHistoryDTO, addedBy: RoleEnum): Prisma.mealsCreateInput{
      return {
         amount: createMealHistoryDTO.amount,
         addedBy: addedBy.valueOf(),
         food: {
            connect: {
               foodId: createMealHistoryDTO.foodId
            }
         },
      }
   }
}

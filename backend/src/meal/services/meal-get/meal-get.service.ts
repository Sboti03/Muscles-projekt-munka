import { Injectable } from '@nestjs/common';
import {CreateMealHistoryDTO} from "../../../meal-history/dto/createMealHistoryDTO";
import {RoleEnum} from "../../../Role/utils/roles";
import {Prisma} from "@prisma/client";

@Injectable()
export class MealGetService {

   getMealCreateInput(createMealHistoryDTO: CreateMealHistoryDTO, addedBy: RoleEnum): Prisma.mealsCreateInput{
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

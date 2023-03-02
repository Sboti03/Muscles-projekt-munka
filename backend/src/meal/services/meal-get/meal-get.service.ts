import { Injectable } from '@nestjs/common';
import {CreateMealHistoryDto} from "../../../meal-history/dto/createMealHistory.dto";
import {Prisma} from "@prisma/client";
import {RoleEnum} from "../../../Common/Role/utils/roles";

@Injectable()
export class MealGetService {

   getMealCreateInput(createMealHistoryDTO: CreateMealHistoryDto, addedBy: RoleEnum): Prisma.mealsCreateInput{
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

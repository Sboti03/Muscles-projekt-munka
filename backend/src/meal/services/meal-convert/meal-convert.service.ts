import { Injectable } from '@nestjs/common';
import {CreateMealDTO} from "../../dto/createMealDTO";
import {Prisma} from "@prisma/client";

@Injectable()
export class MealConvertService {
   constructor() {}

   convertMealCreateDtoToInput(createMealDTO: CreateMealDTO): Prisma.mealsCreateInput{
      return {
         amount: createMealDTO.amount,
         addedBy: createMealDTO.addedBy.valueOf(),
         food: {
            connect: {
               foodId: createMealDTO.foodId
            }
         },
      }
   }
}

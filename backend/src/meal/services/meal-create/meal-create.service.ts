import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class MealCreateService {
   constructor(private prismaService: PrismaService) {}

   createMeal(mealCreateInput: Prisma.mealsCreateInput){
      return this.prismaService.meals.create({
         data: mealCreateInput,
         select: {
            mealId: true
         }
      })

   }
}

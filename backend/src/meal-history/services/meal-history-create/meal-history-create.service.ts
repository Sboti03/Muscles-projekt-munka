import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class MealHistoryCreateService {
   constructor(private prismaService: PrismaService) {}
   createMealHistory(mealHistoryCreateInput: Prisma.mealHistoryCreateInput){
      return this.prismaService.mealHistory.create({
         data: mealHistoryCreateInput,
         select: {
            mealId: true
         }
      })
   }
}

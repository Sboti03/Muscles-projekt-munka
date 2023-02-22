import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class MealService {
   constructor(private prismaService: PrismaService){}

   deleteMealByMealId(mealId: number){
      return this.prismaService.meals.delete({
         where: {mealId}
      });
   }
}

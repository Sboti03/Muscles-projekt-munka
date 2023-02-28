import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class MealDeleteService {
   constructor(private prismaService: PrismaService){}

   deleteMealByMealId(mealId: number){
      return this.prismaService.meals.delete({
         where: {mealId}
      });
   }
}

import {PrismaService} from "../../utils/prirsma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MealService {
   constructor(private prismaService: PrismaService){}

   updateAmountByMealId(mealId: number, amount: number){
      return this.prismaService.meals.update({
         where: {
            mealId,
         },
         data: {amount}
      });
   }

   updateCompletedByMealId(mealId: number, isComleted: boolean){
      return this.prismaService.meals.update({
         where: {
            mealId,
         },
         data: {
            completed: isComleted,
         }
      })
   }
}
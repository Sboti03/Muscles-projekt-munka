import {PrismaService} from "../../../Common/utils/prirsma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MealUpdateService {
   constructor(private prismaService: PrismaService){}

   updateAmountByMealId(mealId: number, amount: number){
      return this.prismaService.meals.update({
         where: {
            mealId,
         },
         data: {amount}
      });
   }

   updateCompletedByMealId(mealId: number, isCompleted: boolean){
      return this.prismaService.meals.update({
         where: {
            mealId,
         },
         data: {
            completed: isCompleted,
         }
      })
   }
}
import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class MealHistoryGetService {
   constructor(private prismaService: PrismaService) {}

   getMealHistoryMealId(dayId: number, periodName: string, foodId: number){
      return this.prismaService.mealHistory.findFirstOrThrow({
         where: {
            dayId,
            periodName,
            meals: {
               foodId
            }
         },
         select: {
            mealId: true
         }
      });
   }
   getMealHistoryByMealhistoryId(mealHistoryId: number){
      return this.prismaService.mealHistory.findFirst({
         where: {
            mealHistoryId
         }
      })
   }

   getProfileIdByMealHistoryId(mealHistoryId: number){
      return this.prismaService.mealHistory.findFirstOrThrow({
         where: {
            mealHistoryId
         },
         select: {
            day: {
               select: {
                  profileId: true
               }
            }
         },

      })
   }
   getMealIdByMealHistoryId(mealHistoryId: number) {
      return this.prismaService.mealHistory.findFirst({
         where: {
            mealHistoryId
         },
         select: {
            mealId: true
         }
      })
   }

   getAllMealHistory(dayId: number, periodName: string){
      return this.prismaService.mealHistory.findMany({
         where: {
            dayId,
            periodName
         },
         include: {
            meals: {
               select: {
                  food: {
                     select: {
                        unit: true
                     }
                  },
               }
            },
         },
      })
   }
   getAllMealId(dayId: number, periodName: string){
      return this.prismaService.mealHistory.findMany({
         select: {
            mealId: true
         },
         where: {
           periodName,
           dayId
         }
      });
   }
   getAllMeal(dayId: number, periodName: string){
      return this.prismaService.mealHistory.findMany({
         where: {
            dayId,
            periodName
         },
         include: {
            meals: {
              include: {
                 food: {
                    include: {
                       unit: true,
                    }
                 }
              }
            },
         }
      })
   }
}
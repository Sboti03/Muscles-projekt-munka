import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../utils/prirsma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class MealService {
   constructor(private prismaService: PrismaService){}

   createMeal(meal: Prisma.mealsCreateInput){
      return this.prismaService.meals.create({
         data: meal,
      });
   }
}

import { Module } from '@nestjs/common';
import { MealService } from './service/meal.service';
import {MealController} from "./controller/meal.controller";

@Module({
  exports: [MealModule],
  providers: [MealService],
  controllers: [MealController]
})
export class MealModule {}

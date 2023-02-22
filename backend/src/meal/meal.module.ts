import { Module } from '@nestjs/common';
import { MealCreateService } from './services/meal-create/meal-create.service';
import {MealController} from "./controller/meal.controller";

@Module({
  exports: [MealModule],
  providers: [MealCreateService],
  controllers: [MealController]
})
export class MealModule {}

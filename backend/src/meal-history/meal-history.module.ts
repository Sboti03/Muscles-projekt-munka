import { Module } from '@nestjs/common';
import {MealHistoryCreateService} from "./services/meal-history-create/meal-history-create.service";
import {MealHistoryConvertService} from "./services/meal-history-convert/meal-history-convert.service";
import {MealHistoryGetService} from "./services/meal-history-get/meal-history-get.service";
import {MealHistoryController} from "./controller/meal-history/meal-history.controller";

@Module({
   exports: [
      MealHistoryCreateService,
      MealHistoryConvertService,
      MealHistoryGetService
   ],
   providers: [
      MealHistoryCreateService,
      MealHistoryConvertService,
      MealHistoryGetService
   ],
   controllers: [MealHistoryController]
})
export class MealHistoryModule {}

import { Module } from '@nestjs/common';
import {MealHistoryCreateService} from "./services/meal-history-create/meal-history-create.service";
import {MealHistoryConvertService} from "./services/meal-history-convert/meal-history-convert.service";
import {MealHistoryGetService} from "./services/meal-history-get/meal-history-get.service";
import { MealHistoryGetController } from './controllers/meal-history-get/meal-history-get.controller';
import { MealHistoryCreateController } from './controllers/meal-history-create/meal-history-create.controller';
import { MealHistoryUpdateController } from './controllers/meal-history-update/meal-history-update.controller';
import {DayHistoryModule} from "../day-history/day-history.module";
import {MealModule} from "../meal/meal.module";

@Module({
   imports: [DayHistoryModule, MealModule],
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
   controllers: [MealHistoryGetController, MealHistoryCreateController, MealHistoryUpdateController]
})
export class MealHistoryModule {}

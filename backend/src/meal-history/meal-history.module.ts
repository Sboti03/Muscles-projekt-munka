import { Module } from '@nestjs/common';
import {MealHistoryCreateService} from "./services/meal-history-create/meal-history-create.service";
import {MealHistoryConvertService} from "./services/meal-history-convert/meal-history-convert.service";
import {MealHistoryGetService} from "./services/meal-history-get/meal-history-get.service";
import { MealHistoryGetController } from './controllers/meal-history-get/meal-history-get.controller';
import { MealHistoryCreateController } from './controllers/meal-history-create/meal-history-create.controller';
import { MealHistoryUpdateController } from './controllers/meal-history-update/meal-history-update.controller';
import {DayHistoryModule} from "../day-history/day-history.module";
import {MealModule} from "../meal/meal.module";
import { MealHistoryDeleteController } from './controllers/meal-history-delete/meal-history-delete.controller';
import { MealHistoryDeleteService } from './services/meal-history-delete/meal-history-delete.service';
import {MealHistoryCheckService} from "./services/meal-history-check/meal-history-check.service";

@Module({
   imports: [DayHistoryModule, MealModule],
   controllers: [MealHistoryGetController, MealHistoryCreateController, MealHistoryUpdateController, MealHistoryDeleteController],
   providers: [
      MealHistoryCreateService,
      MealHistoryConvertService,
      MealHistoryGetService,
      MealHistoryDeleteService,
      MealHistoryCheckService,
   ],
   exports: [
      MealHistoryCreateService,
      MealHistoryConvertService,
      MealHistoryGetService,
      MealHistoryDeleteService,
   ],
})
export class MealHistoryModule {

}

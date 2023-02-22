import { Module } from '@nestjs/common';
import { MealCreateService } from './services/meal-create/meal-create.service';
import {MealController} from "./controller/meal.controller";
import {MealConvertService} from "./services/meal-convert/meal-convert.service";
import {MealUpdateService} from "./services/meal-update/meal-update.service";
import {MealDeleteService} from "./services/meal-delete/meal-delete.service";
import {PrismaService} from "../utils/prirsma.service";

@Module({
  exports: [MealModule],
  providers: [MealCreateService,
    MealConvertService,
    MealUpdateService,
    MealDeleteService,
    PrismaService],
  controllers: [MealController]
})
export class MealModule {}

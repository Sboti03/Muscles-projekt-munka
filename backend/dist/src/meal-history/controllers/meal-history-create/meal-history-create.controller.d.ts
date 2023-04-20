import { RoleEnum } from "../../../Common/Role/utils/roles";
import { CreateMealHistoryDto } from "../../dto/createMealHistory.dto";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { DayHistoryCreateService } from "../../../day-history/services/day-history-create/day-history-create.service";
import { MealCreateService } from "../../../meal/services/meal-create/meal-create.service";
import { MealGetService } from "../../../meal/services/meal-get/meal-get.service";
import { MealHistoryCreateService } from "../../services/meal-history-create/meal-history-create.service";
import { MealHistoryConvertService } from "../../services/meal-history-convert/meal-history-convert.service";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { FoodCheckService } from "../../../foods/services/food-check/food-check.service";
import { ConnectionCheckService } from "../../../Connections/connection/services/connection-check/connection-check.service";
export declare class MealHistoryCreateController {
    private dayHistoryGetService;
    private dayHistoryCreateService;
    private mealCreateService;
    private mealGetService;
    private mealHistoryCreateService;
    private mealHistoryConvertService;
    private dayHistoryCheckService;
    private foodCheckService;
    private connectionCheckService;
    constructor(dayHistoryGetService: DayHistoryGetService, dayHistoryCreateService: DayHistoryCreateService, mealCreateService: MealCreateService, mealGetService: MealGetService, mealHistoryCreateService: MealHistoryCreateService, mealHistoryConvertService: MealHistoryConvertService, dayHistoryCheckService: DayHistoryCheckService, foodCheckService: FoodCheckService, connectionCheckService: ConnectionCheckService);
    createMealHistory(addedBy: RoleEnum, createMealHistoryDTO: CreateMealHistoryDto, profileId: number): Promise<{
        mealId: number;
    }>;
}

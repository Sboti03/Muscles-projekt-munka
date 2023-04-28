import { UpdateMealHistoryDto } from "../../dto/updateMealHistory.dto";
import { MealHistoryConvertService } from "../../services/meal-history-convert/meal-history-convert.service";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { MealHistoryGetService } from "../../services/meal-history-get/meal-history-get.service";
import { MealUpdateService } from "../../../meal/services/meal-update/meal-update.service";
import { MealHistoryCheckService } from "../../services/meal-history-check/meal-history-check.service";
export declare class MealHistoryUpdateController {
    private mealHistoryConvertService;
    private dayHistoryCheckService;
    private mealHistoryGetService;
    private mealUpdateService;
    private mealHistoryCheckService;
    constructor(mealHistoryConvertService: MealHistoryConvertService, dayHistoryCheckService: DayHistoryCheckService, mealHistoryGetService: MealHistoryGetService, mealUpdateService: MealUpdateService, mealHistoryCheckService: MealHistoryCheckService);
    updateMealHistory(updateMealHistoryDTO: UpdateMealHistoryDto, currentProfileId: number): Promise<import(".prisma/client").meals>;
}

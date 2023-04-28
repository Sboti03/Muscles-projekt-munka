import { MealHistoryCheckService } from "../../services/meal-history-check/meal-history-check.service";
import { MealHistoryGetService } from "../../services/meal-history-get/meal-history-get.service";
import { MealDeleteService } from "../../../meal/services/meal-delete/meal-delete.service";
import { IdParam } from "../../../Common/params/id.param";
export declare class MealHistoryDeleteController {
    private mealHistoryCheckService;
    private mealHistoryGetService;
    private mealDeleteService;
    constructor(mealHistoryCheckService: MealHistoryCheckService, mealHistoryGetService: MealHistoryGetService, mealDeleteService: MealDeleteService);
    deleteMealHistory(currentProfileId: number, idParam: IdParam): Promise<import(".prisma/client").meals>;
}

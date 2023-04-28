import { MealHistoryGetService } from "../meal-history-get/meal-history-get.service";
export declare class MealHistoryCheckService {
    private mealHistoryGetService;
    constructor(mealHistoryGetService: MealHistoryGetService);
    checkExistingMealHistoryById(mealHistoryId: number): Promise<boolean>;
}

import {Injectable} from '@nestjs/common';
import {MealHistoryGetService} from "../meal-history-get/meal-history-get.service";


@Injectable()
export class MealHistoryCheckService {

    constructor(private mealHistoryGetService: MealHistoryGetService) {
    }

    async checkExistingMealHistoryById(mealHistoryId: number) {
        try {
            await this.mealHistoryGetService.getMealHistoryById(mealHistoryId)
            return true
        } catch (e) {
            return false
        }
    }

}

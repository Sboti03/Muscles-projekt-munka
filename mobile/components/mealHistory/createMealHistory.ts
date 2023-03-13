import MealHistory, {PeriodNamesEnum} from "./types/mealHistory";

export default function CreateMealHistory(): MealHistory {
    return {
        amount: 250,
        date: new Date(),
        foodId: 0,
        periodName: PeriodNamesEnum.DINNER
    }
}
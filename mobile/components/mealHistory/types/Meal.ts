import FoodInterface from "../../food/foodInterface";

export interface Meal {
    amount: number,
    addedBy: string,
    completed: boolean,
    food: FoodInterface
}

export interface DayPeriodResponse {
    meal: Meal,
    mealHistoryId: number
}
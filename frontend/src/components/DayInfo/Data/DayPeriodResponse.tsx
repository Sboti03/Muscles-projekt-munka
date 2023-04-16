import {Food} from "../../FoodAdder/FoodSearchPage";
import {RoleEnum} from "../../Types/Role";


export interface Meal {
    amount: number;
    addedBy: RoleEnum;
    completed: boolean;
    food: Food;
}

export interface DayPeriodResponse {
    meal: Meal;
    mealHistoryId: number;
}


export function getMinimalInfo(dayPeriodResponse:DayPeriodResponse[]) {
    let totalCalorie = 0;
    if (dayPeriodResponse.length > 0) {
        dayPeriodResponse.forEach((response, i)=> {
            const {meal} = response
            totalCalorie += meal.food.kcal / meal.food.perUnit * meal.amount
        })
    }
    return Math.floor(totalCalorie)
}
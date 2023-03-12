export interface Food {
    foodId: number;
    name: string;
    kcal: number;
    unitId: number;
    perUnit: number;
    protein: number;
    fat: number;
    saturatedFat: number;
    polyunsaturatedFat: number;
    monounsaturatedFat: number;
    carbohydrate: number;
    sugar: number;
    fiber: number;
    changedAt: Date;
}

export interface Meal {
    amount: number;
    addedBy: string;
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
    return totalCalorie
}
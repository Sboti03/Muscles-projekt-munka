
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

export interface MealHistory {
    mealHistoryId: number;
}

export interface DayPeriodResponse {
    amount: number;
    addedBy: string;
    completed: boolean;
    food: Food;
    mealHistory: MealHistory[];
}


export function getMinimalInfo(dayPeriodResponse:DayPeriodResponse[]) {
    let totalCalorie = 0;
    if (dayPeriodResponse.length > 0) {
        dayPeriodResponse.forEach((meal, i)=> {
            totalCalorie += meal.food.kcal / meal.food.perUnit * meal.amount
        })
    }
    return totalCalorie
}
export interface MealHistoryResponse {
    dayHistory: DayHistory[];
    goal:       Goal;
    weight:     Weight;
}

export interface DayHistory {
    meals: Meals;
}

export interface Meals {
    amount: number;
    food:   Food;
}

export interface Food {
    perUnit:      number;
    fat:          number;
    fiber:        number;
    protein:      number;
    sugar:        number;
    carbohydrate: number;
    kcal:         number;
}

export interface Goal {
    goalId:              number;
    profileId:           number;
    targetWeight?:        number;
    targetCalories?:      number;
    carbohydratesPerDay: number;
    proteinPerDay:       number;
    fatPerDay:           number;
    date:                Date;
}

export interface Weight {
    weight:     number;
    weightDate: Date;
}

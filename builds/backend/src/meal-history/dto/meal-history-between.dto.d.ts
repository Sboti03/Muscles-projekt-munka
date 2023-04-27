export interface MealHistoryBetweenDto {
    date: string;
    weightHistory: WeightHistory | null;
    mealHistory: MealHistory[];
}
export interface WeightHistory {
    weight: number;
}
export interface MealHistory {
    periodName: string;
    meal: Meal;
}
export interface Meal {
    addedBy: string;
    completed: boolean;
    amount: number;
    food: Food;
}
export interface Food {
    unit: Unit;
    kcal: number;
    fat: number;
    fiber: number | null;
    sugar: number | null;
    foodId: number;
    protein: number;
    carbohydrate: number;
    name: string;
    perUnit: number;
}
export interface Unit {
    unit: string;
    defaultValue: number;
}

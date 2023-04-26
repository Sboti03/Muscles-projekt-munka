export interface FoodFilter {
    kcal: BetweenValue
    name?: string
    protein: BetweenValue
    fat: BetweenValue
    carbohydrate: BetweenValue
    sugar: BetweenValue
    fiber: BetweenValue
}


export interface BetweenValue {
    min: number
    max: number
}
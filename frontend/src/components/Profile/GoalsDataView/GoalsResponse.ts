export interface GoalsResponse {
    carbohydratesPerDay: number
    fatPerDay: number
    proteinPerDay: number
    targetCalories: number
    targetWeight: number
    breakfastPerDay: number,
    lunchPerDay: number,
    dinnerPerDay: number,
    otherPerDay: number,
}


export const GoalsInitData: GoalsResponse = {
    breakfastPerDay: 30,
    dinnerPerDay: 30,
    lunchPerDay: 30,
    otherPerDay: 10,
    targetWeight: 70,
    targetCalories: 2000,
    carbohydratesPerDay: 50,
    fatPerDay: 20,
    proteinPerDay: 30
}

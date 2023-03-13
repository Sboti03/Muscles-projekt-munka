export default interface MealHistory {
    periodName: PeriodNamesEnum,
    date: Date,
    foodId: number,
    amount: number
}

export enum PeriodNamesEnum {
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch',
    DINNER = 'dinner',
    OTHER = 'other'
}
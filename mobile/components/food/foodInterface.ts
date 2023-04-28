export default interface FoodInterface {
    foodId: number | string,
    name: string,
    kcal: number,
    unit: Unit,
    perUnit: number,
    protein: number,
    fat: number,
    saturatedFat: number | undefined,
    polyunsaturatedFat: number | undefined,
    monounsaturatedFat: number |undefined,
    carbohydrate: number,
    sugar: number | undefined,
    fiber: number | undefined
}
export interface Unit {
    changedAt: Date,
    defaultValue: number,
    unit: UnitsEnum,
    unitId: number,
}
export enum UnitsEnum {
    GRAM = 'gram',
    POUND = 'pound'
}
export default interface Food {
    name: string,
    kcal: number,
    unit: UnitsEnum,
    perUnit: number,
    protein: number,
    fat: number,
    saturatedFat: number,
    polyunsaturatedFat: number,
    monounsaturatedFat: number,
    carbohydrate: number,
    sugar: number,
    fiber: number
}
export enum UnitsEnum {
    GRAM = 'gram',
    POUND = 'pound'
}
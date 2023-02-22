
export interface UnitType {
    unit: UnitsEnum,
    unitId: number,
    defaultValue: number
}
export enum UnitsEnum {
    GRAM = 'gram',
    LITER = 'liter',
    DECILITER = 'deciliter',
    MILLILITERS = 'milliliters'
}

export const Units: UnitType[]  = [
    {unit: UnitsEnum.GRAM, defaultValue: 100, unitId: 0},
    {unit: UnitsEnum.LITER, defaultValue: 1, unitId: 1},
    {unit: UnitsEnum.DECILITER, defaultValue: 10, unitId: 2},
    {unit: UnitsEnum.MILLILITERS, defaultValue: 100, unitId: 3},
]

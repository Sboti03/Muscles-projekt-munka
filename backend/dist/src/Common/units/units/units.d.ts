export interface UnitType {
    unit: UnitsEnum;
    unitId: number;
    defaultValue: number;
}
export declare enum UnitsEnum {
    GRAM = "gram",
    LITER = "liter",
    DECILITER = "deciliter",
    MILLILITERS = "milliliters"
}
export declare const Units: UnitType[];

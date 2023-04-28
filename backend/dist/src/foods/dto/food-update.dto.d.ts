import { UnitsEnum } from "../../Common/units/units/units";
export declare class FoodUpdateDto {
    name?: string;
    kcal?: number;
    unit?: UnitsEnum;
    perUnit?: number;
    protein?: number;
    fat?: number;
    saturatedFat?: number;
    polyunsaturatedFat?: number;
    monounsaturatedFat?: number;
    carbohydrate?: number;
    sugar?: number;
    fiber?: number;
}

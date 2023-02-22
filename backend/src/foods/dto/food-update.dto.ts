import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Exclude, Transform, Type} from "class-transformer";
import {UnitsEnum} from "../../units/units/units";
import {IsNullable} from "../../decorators/class-validator.decorator";

export class FoodUpdateDto {

    @IsNullable()
    @Type(() => String)
    @IsString()
    name?: string

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    kcal?: number


    @Transform(({value}) => UnitsEnum[value])
    @IsNullable()
    unit?: UnitsEnum

    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    perUnit?: number

    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    protein?: number

    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    fat?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    saturatedFat?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    polyunsaturatedFat?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    monounsaturatedFat?: number


    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    carbohydrate: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    sugar?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    fiber?: number

}
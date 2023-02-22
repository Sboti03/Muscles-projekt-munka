import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Exclude, Transform, Type} from "class-transformer";
import {UnitsEnum} from "../../units/units/units";
import {IsNullable} from "../../decorators/class-validator.decorator";

export class FoodCreateDto {

    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    name: string

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    kcal: number


    @Transform(({value}) => UnitsEnum[value])
    @IsNotEmpty()
    unit: UnitsEnum

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    perUnit: number

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    protein: number

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    fat: number

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
import {IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";
import {UnitsEnum} from "../../Common/units/units/units";
import {ApiProperty} from "@nestjs/swagger";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";

export class FoodUpdateDto {

    @IsUndefinable()
    @Type(() => String)
    @IsString()
    @ApiProperty({example: 20})
    name?: string

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    kcal?: number


    @Transform(({value}) => Object.values(UnitsEnum).find(unit => unit === value))
    @IsUndefinable()
    @ApiProperty({example: 20})
    unit?: UnitsEnum

    @Type(() => Number)
    @IsUndefinable()
    @IsNumber()
    @ApiProperty({example: 20})
    perUnit?: number

    @Type(() => Number)
    @IsUndefinable()
    @IsNumber()
    @ApiProperty({example: 20})
    protein?: number

    @Type(() => Number)
    @IsUndefinable()
    @IsNumber()
    @ApiProperty({example: 20})
    fat?: number

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    saturatedFat?: number

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    polyunsaturatedFat?: number

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    monounsaturatedFat?: number


    @Type(() => Number)
    @IsUndefinable()
    @IsNumber()
    @ApiProperty({example: 20})
    carbohydrate?: number

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    sugar?: number

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    fiber?: number

}
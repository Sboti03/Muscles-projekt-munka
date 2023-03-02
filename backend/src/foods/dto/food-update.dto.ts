import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Exclude, Transform, Type} from "class-transformer";
import {UnitsEnum} from "../../Common/units/units/units";
import {IsNullable} from "../../decorators/class-validator.decorator";
import {ApiProperty} from "@nestjs/swagger";

export class FoodUpdateDto {

    @IsNullable()
    @Type(() => String)
    @IsString()
    @ApiProperty({example: 20})
    name?: string

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    kcal?: number


    @Transform(({value}) => UnitsEnum[value])
    @IsNullable()
    @ApiProperty({example: 20})
    unit?: UnitsEnum

    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    @ApiProperty({example: 20})
    perUnit?: number

    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    @ApiProperty({example: 20})
    protein?: number

    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    @ApiProperty({example: 20})
    fat?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    saturatedFat?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    polyunsaturatedFat?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    monounsaturatedFat?: number


    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    @ApiProperty({example: 20})
    carbohydrate?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    sugar?: number

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 20})
    fiber?: number

}
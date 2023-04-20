import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";
import {UnitsEnum} from "../../Common/units/units/units";
import {ApiProperty} from "@nestjs/swagger";
import { IsNullable } from "../../Common/utils/IsNullable.validation";

export class FoodCreateDto {

    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    @ApiProperty({example: 'alma'})

    name: string

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({example: 210})

    kcal: number


    @Transform(({value}) => Object.values(UnitsEnum).find(unit=> unit === value))
    @IsNotEmpty()
    @ApiProperty({example: 'GRAM'})
    unit: UnitsEnum

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 100})
    perUnit: number

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 20})

    protein: number

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 10})

    fat: number

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
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example: 20})

    carbohydrate: number

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
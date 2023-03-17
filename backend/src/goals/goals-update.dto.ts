import {IsNullable} from "../decorators/class-validator.decorator";
import {Type} from "class-transformer";
import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GoalsUpdateDto {

    @ApiProperty()
    @IsNullable()
    @Min(0)
    @Type(()=> Number)
    @IsNumber()
    targetWeight?: number

    @ApiProperty()
    @IsNullable()
    @Min(0)
    @Type(()=> Number)
    @IsNumber()
    targetCalories?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    carbohydratesPerDay?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    proteinPerDay?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    fatPerDay?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    breakfastPerDay?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    lunchPerDay?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    dinnerPerDay?: number

    @ApiProperty()
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    otherPerDay?: number
}
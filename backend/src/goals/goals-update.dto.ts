import {Type} from "class-transformer";
import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { IsUndefinable } from "../Common/utils/IsNullable.validation";

export class GoalsUpdateDto {

    @ApiProperty()
    @IsUndefinable()
    @Min(0)
    @Type(()=> Number)
    @IsNumber()
    targetWeight?: number

    @ApiProperty()
    @IsUndefinable()
    @Min(0)
    @Type(()=> Number)
    @IsNumber()
    targetCalories?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    carbohydratesPerDay?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    proteinPerDay?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    fatPerDay?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    breakfastPerDay?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    lunchPerDay?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    dinnerPerDay?: number

    @ApiProperty()
    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    otherPerDay?: number
}
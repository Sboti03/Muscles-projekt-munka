import {Transform, Type} from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import {PeriodNamesEnum} from "../../Common/utils/PeriodNames";
import {ApiProperty} from "@nestjs/swagger";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";

export default class MealHistoryGetDto {

    @Transform(({value}) => new Date(value))    @IsDate()
    @ApiProperty({example: '2022-08-13'})
    @IsNotEmpty()
    date: Date

    @Transform(({value})=> Object.values(PeriodNamesEnum).find(periodName => periodName === value))
    @IsNotEmpty()
    @ApiProperty({example: 'breakfast'})
    periodName: PeriodNamesEnum

    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @ApiProperty({example: 12})
    userId?: number

}
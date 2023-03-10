import {Transform, Type} from "class-transformer";
import {IsDate, IsNotEmpty} from "class-validator";
import {PeriodNamesEnum} from "../../Common/utils/PeriodNames";
import {ApiProperty} from "@nestjs/swagger";

export default class MealHistoryGetDto {

    @Type(()=> Date)
    @IsDate()
    @ApiProperty({example: '2022-08-13'})
    @IsNotEmpty()
    date: Date

    @Transform(({value})=> Object.values(PeriodNamesEnum).find(periodName => periodName === value))
    @IsNotEmpty()
    @ApiProperty({example: 'breakfast'})
    periodName: PeriodNamesEnum
}
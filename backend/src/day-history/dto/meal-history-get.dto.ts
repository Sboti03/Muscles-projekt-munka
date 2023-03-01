import {Transform, Type} from "class-transformer";
import {IsDate, IsNotEmpty} from "class-validator";
import {PeriodNamesEnum} from "../../Common/utils/PeriodNames";

export default class MealHistoryGetDto {

    @Type(()=> Date)
    @IsDate()
    @IsNotEmpty()
    date: Date

    @Transform(({value})=> PeriodNamesEnum[value])
    @IsNotEmpty()
    periodName: PeriodNamesEnum
}
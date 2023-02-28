import {IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {PeriodNamesEnum} from "../../utils/period-name";
import {Transform, Type} from "class-transformer";

export class CreateMealHistoryDTO{
   @Transform(({value}) => PeriodNamesEnum[value])
   @IsNotEmpty()
   periodName: PeriodNamesEnum;
   @IsDate()
   @IsNotEmpty()
   @Type(()=> Date)
   date: Date;
   @IsNumber()
   @IsNotEmpty()
   foodId: number;
   @IsNumber()
   @IsNotEmpty()
   amount: number;
}
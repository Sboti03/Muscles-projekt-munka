import {IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";
import {PeriodNamesEnum} from "../../Common/utils/PeriodNames";

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
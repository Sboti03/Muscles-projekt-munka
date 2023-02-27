import {IsBoolean, IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {PeriodNamesEnum} from "../../utils/period-name";
import {Transform} from "class-transformer";
import {IsNullable} from "../../decorators/class-validator.decorator";

export class UpdateMealHistoryDTO{
   @Transform(({value}) => PeriodNamesEnum[value])
   @IsNotEmpty()
   periodName: PeriodNamesEnum;
   @IsDate()
   @IsNotEmpty()
   date: Date;
   @IsNumber()
   @IsNotEmpty()
   foodId: number;
   @IsNumber()
   @IsNotEmpty()
   @IsNullable()
   amount?: number;
   @IsBoolean()
   @IsNullable()
   @IsNotEmpty()
   isCompleted?: boolean;
}
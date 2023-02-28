import {IsBoolean, IsNumber} from "class-validator";
import {IsNullable} from "../../decorators/class-validator.decorator";
import {Type} from "class-transformer";

export class UpdateMealHistoryDTO{
   @IsNumber()
   @Type(()=> Number)
   mealHistoryId: number;


   @IsNullable()
   @Type(()=> Number)
   @IsNumber()
   amount?: number;


   @IsNullable()
   @Type(()=> Boolean)
   @IsBoolean()
   isCompleted?: boolean;
}
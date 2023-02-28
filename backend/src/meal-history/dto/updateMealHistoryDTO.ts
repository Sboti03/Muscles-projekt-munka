import {IsBoolean, IsNumber} from "class-validator";
import {IsNullable} from "../../decorators/class-validator.decorator";

export class UpdateMealHistoryDTO{
   @IsNumber()
   mealHistoryId: number;
   @IsNumber()
   @IsNullable()
   amount?: number;
   @IsBoolean()
   @IsNullable()
   isCompleted?: boolean;
}
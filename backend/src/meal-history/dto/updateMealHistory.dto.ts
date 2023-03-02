import {IsBoolean, IsNumber} from "class-validator";
import {IsNullable} from "../../decorators/class-validator.decorator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateMealHistoryDto {
   @IsNumber()
   @ApiProperty()
   @Type(()=> Number)
   mealHistoryId: number;


   @IsNullable()
   @Type(()=> Number)
   @IsNumber()
   @ApiProperty()
   amount?: number;


   @IsNullable()
   @Type(()=> Boolean)
   @IsBoolean()
   @ApiProperty()
   isCompleted?: boolean;
}
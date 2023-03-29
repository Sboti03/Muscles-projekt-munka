import {IsBoolean, IsNumber} from "class-validator";
import {IsUndefinable} from "../../decorators/class-validator.decorator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateMealHistoryDto {


   @IsUndefinable()
   @Type(()=> Number)
   @IsNumber()
   @ApiProperty()
   amount?: number;


   @IsUndefinable()
   @Type(()=> Boolean)
   @IsBoolean()
   @ApiProperty()
   isCompleted?: boolean;
}
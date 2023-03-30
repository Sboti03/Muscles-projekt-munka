import {IsBoolean, IsNumber} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";

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
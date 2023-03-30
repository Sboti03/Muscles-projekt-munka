import {IsNumber} from "class-validator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {ApiProperty} from "@nestjs/swagger";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";

export class UpdateMealDto {
   @IsUndefinable()
   @IsNumber()
   @ApiProperty({example: 1})
   foodId?: number;

   @IsUndefinable()
   @IsNumber()
   @ApiProperty({example: 20})
   amount?: number;

   @IsUndefinable()
   @ApiProperty({example: 'COACH'})
   addedBy?: RoleEnum;

   @IsUndefinable()
   completed?: boolean;
}
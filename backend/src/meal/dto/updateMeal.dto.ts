import {IsNumber} from "class-validator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {IsNullable} from "../../decorators/class-validator.decorator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateMealDto {
   @IsNullable()
   @IsNumber()
   @ApiProperty({example: 1})
   foodId?: number;

   @IsNullable()
   @IsNumber()
   @ApiProperty({example: 20})
   amount?: number;

   @IsNullable()
   @ApiProperty({example: 'COACH'})
   addedBy?: RoleEnum;

   @IsNullable()
   completed?: boolean;
}
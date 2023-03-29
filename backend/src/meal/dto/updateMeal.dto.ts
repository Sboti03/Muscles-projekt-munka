import {IsNumber} from "class-validator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {IsUndefinable} from "../../decorators/class-validator.decorator";
import {ApiProperty} from "@nestjs/swagger";

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
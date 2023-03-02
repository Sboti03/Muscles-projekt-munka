import {IsNotEmpty, IsNumber} from "class-validator";
import {RoleEnum} from "../../Common/Role/utils/roles";
import {ApiProperty} from "@nestjs/swagger";


export class CreateMealDto {
   @IsNotEmpty()
   @IsNumber()
   @ApiProperty({example: 1})
   foodId: number;

   @IsNumber()
   @IsNotEmpty()
   @ApiProperty({example: 20})
   amount: number;
   @ApiProperty({example: 'USER'})
   addedBy: RoleEnum;
}
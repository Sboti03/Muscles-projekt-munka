import {IsNotEmpty, IsNumber} from "class-validator";
import {RoleEnum} from "../../Role/utils/roles";


export class CreateMealDTO {
   @IsNotEmpty()
   @IsNumber()
   foodId: number;

   @IsNumber()
   @IsNotEmpty()
   amount: number;
   addedBy: RoleEnum;
}
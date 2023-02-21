import {IsNumber} from "class-validator";
import {RoleEnum} from "../../Role/utils/roles";
import {IsNullable} from "../../decorators/class-validator.decorator";

export class UpdateMealDTO {
   @IsNullable()
   @IsNumber()
   foodId?: number;

   @IsNullable()
   @IsNumber()
   amount?: number;

   @IsNullable()
   addedBy?: RoleEnum;

   @IsNullable()
   completed?: boolean;
}
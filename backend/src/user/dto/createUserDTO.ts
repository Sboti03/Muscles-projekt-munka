import {IsBoolean, IsEmail, IsNotEmpty} from 'class-validator';
import {Type} from "class-transformer";

export class CreateUserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()

  @Type(()=> Boolean)
  @IsBoolean()
  isCoach: boolean;
}

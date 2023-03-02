import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class LoginDto {
   @IsEmail()
   @ApiProperty({example: 'user@user.com'})
   email: string

   @IsNotEmpty()
   @ApiProperty({example: 'password'})
   password: string
}
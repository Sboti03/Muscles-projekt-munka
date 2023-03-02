import {IsBoolean, IsEmail, IsNotEmpty} from 'class-validator';
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()

  @ApiProperty()
  @Type(()=> Boolean)
  @IsBoolean()
  isCoach: boolean;
}

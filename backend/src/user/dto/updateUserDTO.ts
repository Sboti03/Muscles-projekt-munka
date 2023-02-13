import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  email?: string;
  @IsNotEmpty()
  password?: string;
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  isCoach: boolean;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PasswordChangeDto {
    @ApiProperty({example: '123456'})
    @IsString()
    @IsNotEmpty()
    oldPassword: string

    @ApiProperty({example: 'VeRyStrong!!e432'})
    @IsString()
    @IsNotEmpty()
    newPassword: string
}
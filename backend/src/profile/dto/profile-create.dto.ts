import {IsDate, IsNotEmpty, IsNumber, IsString, ValidateIf} from "class-validator";
import {IsNullable} from "../../Common/utils/IsNullable.validation";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export default class ProfileCreateDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string

    @IsNullable()
    @IsString()
    @ApiProperty()
    lastName?: string

    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    birthDay: Date

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    height?: number

}
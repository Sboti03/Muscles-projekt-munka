import {IsDate, IsNotEmpty, IsNumber, IsString, ValidateIf} from "class-validator";
import {IsNullable} from "../../Common/utils/IsNullable.validation";
import {Transform, Type} from "class-transformer";
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

    @Transform(({value}) => new Date(value))    @IsDate()
    @ApiProperty()
    birthDay: Date

    @IsNullable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    height?: number

}
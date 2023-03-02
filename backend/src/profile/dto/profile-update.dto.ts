import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {IsNullable} from "../../Common/utils/IsNullable.validation";
import {ApiProperty} from "@nestjs/swagger";

export default class ProfileUpdateDto{
    @IsNullable()
    @IsString()
    @ApiProperty()
    firstName?: string

    @IsNullable()
    @IsString()
    @ApiProperty()
    lastName?: string

    @IsNullable()
    @IsDate()
    @ApiProperty()
    birthDay?: Date

    @IsNullable()
    @IsNumber()
    @ApiProperty()
    height?: number

}
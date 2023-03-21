import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {IsNullable} from "../../Common/utils/IsNullable.validation";
import {ApiProperty} from "@nestjs/swagger";
import {Transform, Type} from "class-transformer";

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
    @Transform(({value}) => new Date(value))
    @IsDate()
    @ApiProperty()
    birthDay?: Date

    @IsNullable()
    @IsNumber()
    @Type(()=> Number)
    @ApiProperty()
    height?: number

}
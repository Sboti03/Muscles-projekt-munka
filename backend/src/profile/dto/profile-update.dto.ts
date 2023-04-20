import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";
import {ApiProperty} from "@nestjs/swagger";
import {Transform, Type} from "class-transformer";

export default class ProfileUpdateDto{
    @IsUndefinable()
    @IsString()
    @ApiProperty()
    firstName?: string

    @IsUndefinable()
    @IsString()
    @ApiProperty()
    lastName?: string

    @IsUndefinable()
    @Transform(({value}) => new Date(value))
    @IsDate()
    @ApiProperty()
    birthDay?: Date

    @IsUndefinable()
    @IsNumber()
    @Type(()=> Number)
    @ApiProperty()
    height?: number

    @Type(()=> Boolean)
    @IsBoolean()
    @IsUndefinable()
    male?: boolean

}
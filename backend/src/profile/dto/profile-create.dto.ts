import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";
import {Transform, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export default class ProfileCreateDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string

    @IsUndefinable()
    @IsString()
    @ApiProperty()
    lastName?: string

    @Transform(({value}) => new Date(value))    @IsDate()
    @ApiProperty()
    birthDay: Date

    @IsUndefinable()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    height?: number


    @Type(()=> Boolean)
    @IsBoolean()
    @IsUndefinable()
    male?: boolean

}
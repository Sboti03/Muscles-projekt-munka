import {Transform, Type} from "class-transformer";
import {IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { IsUndefinable } from "../../../Common/utils/IsNullable.validation";

export class UserDayHistoryQuery {

    @ApiProperty()
    @Type(() => Number)
    @IsUndefinable()
    @IsNumber()
    userId?: number;


    @ApiProperty()
    @Transform(({value}) => new Date(value))    @IsDate()
    @IsNotEmpty()
    date: Date;



}
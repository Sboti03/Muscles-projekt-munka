import {Transform, Type} from "class-transformer";
import {IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {IsNullable} from "../../../Common/utils/IsNullable.validation";

export class UserDayHistoryQuery {

    @ApiProperty()
    @Type(() => Number)
    @IsNullable()
    @IsNumber()
    id?: number;


    @ApiProperty()
    @Transform(({value}) => new Date(value))    @IsDate()
    @IsNotEmpty()
    date: Date;

}
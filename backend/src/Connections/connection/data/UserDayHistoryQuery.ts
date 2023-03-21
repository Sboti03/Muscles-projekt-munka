import {Type} from "class-transformer";
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
    @Type(()=> Date)
    @IsDate()
    @IsNotEmpty()
    date: Date;

}
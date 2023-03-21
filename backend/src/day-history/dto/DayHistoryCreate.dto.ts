import {Transform, Type} from "class-transformer";
import {IsDate} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DayHistoryCreateDto {
    @Transform(({value}) => new Date(value))    @IsDate()
    @ApiProperty({example: '2022-08-13'})
    date: Date;
}
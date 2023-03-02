import {Type} from "class-transformer";
import {IsDate} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DayHistoryCreateDto {
    @Type(() => Date)
    @IsDate()
    @ApiProperty({example: '2022-08-13'})
    date: Date;
}
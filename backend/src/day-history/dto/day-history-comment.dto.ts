import {ApiProperty} from "@nestjs/swagger";
import {Transform, Type} from "class-transformer";
import {IsDate, IsNumber, IsString} from "class-validator";

export default class DayHistoryCommentDto {

    @Type(()=> Number)
    @IsNumber()
    @ApiProperty()
    userId: number

    @Transform(({value}) => new Date(value))
    @IsDate()
    @ApiProperty()
    date: Date

    @IsString()
    comment: string



}
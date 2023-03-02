import {Type} from "class-transformer";
import {IsDate, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class WeightHistoryDataDto {

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber()
    weight: number;
}
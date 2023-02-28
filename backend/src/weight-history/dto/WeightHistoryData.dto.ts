import {Type} from "class-transformer";
import {IsDate, IsNumber} from "class-validator";

export class WeightHistoryDataDto {

    @Type(() => Date)
    @IsDate()
    date: Date;

    @Type(() => Number)
    @IsNumber()
    weight: number;
}
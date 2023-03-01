import {Type} from "class-transformer";
import {IsDate} from "class-validator";

export class DayHistoryCreateDto {
    @Type(() => Date)
    @IsDate()
    date: Date;
}
import {IsDate, IsNotEmpty} from "class-validator";
import {Type} from "class-transformer";

export class DateParam {
    @Type(()=> Date)
    @IsNotEmpty()
    @IsDate()
    date: Date
}
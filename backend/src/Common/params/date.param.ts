import {IsDate, IsNotEmpty} from "class-validator";
import {Transform, Type} from "class-transformer";

export class DateParam {
    @Transform(({value}) => new Date(value))
    @IsNotEmpty()
    @IsDate()
    date: Date
}
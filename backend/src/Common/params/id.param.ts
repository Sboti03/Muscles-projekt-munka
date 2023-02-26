import {Type} from "class-transformer";
import {IsNotEmpty, IsNumber} from "class-validator";

export class IdParam {
    @Type(()=> Number)
    @IsNotEmpty()
    @IsNumber()
    id: number
}
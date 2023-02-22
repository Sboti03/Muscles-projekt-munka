import {IsDate, IsNotEmpty, IsNumber, IsString, ValidateIf} from "class-validator";
import {IsNullable} from "../../utils/IsBullable.validation";
import {Type} from "class-transformer";

export default class ProfileCreateDto {

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNullable()
    @IsString()
    lastName?: string

    @Type(()=> Date)
    @IsDate()
    birthDay: Date

    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    height?: number

    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    targetWeight?: number

}
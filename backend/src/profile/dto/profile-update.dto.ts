import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {IsNullable} from "../../utils/IsNullable.validation";

export default class ProfileUpdateDto {
    @IsNullable()
    @IsString()
    firstName?: string

    @IsNullable()
    @IsString()
    lastName?: string

    @IsNullable()
    @IsDate()
    birthDay?: Date

    @IsNullable()
    @IsNumber()
    height?: number

    @IsNullable()
    @IsNumber()
    targetWeight?: number
}
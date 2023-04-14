import {IsUndefinable} from "../../Common/utils/IsNullable.validation";
import {Transform, Type} from "class-transformer";
import {IsDate, IsNumber} from "class-validator";

export class CommentGetDto {

    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    profileId?: number


    @IsUndefinable()
    @Transform(({value}) => new Date(value))
    @IsDate()
    date: Date

}
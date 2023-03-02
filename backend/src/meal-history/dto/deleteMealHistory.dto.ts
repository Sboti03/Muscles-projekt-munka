import {Type} from "class-transformer";
import {IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class DeleteMealHistoryDto {
    @Type(()=> Number)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    mealHistoryId: number
}
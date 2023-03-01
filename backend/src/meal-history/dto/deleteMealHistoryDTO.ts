import {Type} from "class-transformer";
import {IsNotEmpty, IsNumber} from "class-validator";

export default class DeleteMealHistoryDTO {
    @Type(()=> Number)
    @IsNumber()
    @IsNotEmpty()
    mealHistoryId: number
}
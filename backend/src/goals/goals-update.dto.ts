import {IsNullable} from "../decorators/class-validator.decorator";
import {Type} from "class-transformer";
import {IsNumber, Min} from "class-validator";

export class GoalsUpdateDto {

    @IsNullable()
    @Min(0)
    @Type(()=> Number)
    @IsNumber()
    targetWeight?: number

    @IsNullable()
    @Min(0)
    @Type(()=> Number)
    @IsNumber()
    targetCalories?: number

    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    carbohydratesPerDay?: number

    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    proteinPerDay?: number

    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    @Min(0)
    fatPerDay?: number
}
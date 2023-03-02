import {IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";
import {PeriodNamesEnum} from "../../Common/utils/PeriodNames";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMealHistoryDto {
    @Transform(({value}) => PeriodNamesEnum[value])
    @IsNotEmpty()
    @ApiProperty({example: 'breakfast'})
    periodName: PeriodNamesEnum;
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    @ApiProperty()
    date: Date;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    foodId: number;
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    amount: number;
}
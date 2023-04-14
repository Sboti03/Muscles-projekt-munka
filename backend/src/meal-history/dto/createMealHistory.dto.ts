import {IsBoolean, IsDate, IsNotEmpty, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";
import {PeriodNamesEnum} from "../../Common/utils/PeriodNames";
import {ApiProperty} from "@nestjs/swagger";
import {UnitsEnum} from "../../Common/units/units/units";
import {isUndefined} from "@nestjs/common/utils/shared.utils";
import {IsUndefinable} from "../../Common/utils/IsNullable.validation";

export class CreateMealHistoryDto {
    @Transform(({value}) => Object.values(PeriodNamesEnum).find(periodName => periodName === value))
    @IsNotEmpty()
    @ApiProperty({example: 'breakfast'})
    periodName: PeriodNamesEnum;
    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => new Date(value))
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

    @IsUndefinable()
    @Type(()=> Boolean)
    @IsBoolean()
    @ApiProperty()
    isCompleted?: boolean

    @IsUndefinable()
    @Type(()=> Number)
    @IsNumber()
    @ApiProperty()
    userId?: number

}
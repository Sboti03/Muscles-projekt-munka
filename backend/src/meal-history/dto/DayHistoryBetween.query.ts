import { ApiProperty } from "@nestjs/swagger";
import { IsNullable } from "../../Common/utils/IsNullable.validation";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export default class DayHistoryBetweenQuery {

    @ApiProperty({example: 12})
    @IsNullable()
    @Type(()=> Number)
    @IsNumber()
    userId?: number


    @ApiProperty({example: "2023-01-12"})
    @Transform(({value}) => new Date(value))
    @IsDate()
    from: Date

    @ApiProperty({example: "2023-05-12"})
    @Transform(({value}) => new Date(value))
    @IsDate()
    to: Date

}
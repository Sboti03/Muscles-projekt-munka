import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";
import { IsUndefinable } from "../../Common/utils/IsNullable.validation";

export default class SearchFoodQuery {
  @ApiProperty({example: 1})
  @IsUndefinable()
  @Type(()=> Number)
  @IsNumber()
  @Min(1)
  page?: number

  @ApiProperty({example: 25})
  @Type(()=> Number)
  @IsNumber()
  @IsUndefinable()
  @Min(1)
  max?: number



}
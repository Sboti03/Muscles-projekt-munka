import { ApiProperty, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export default class SearchFoodQuery {
  @ApiProperty({example: 1})
  @Type(()=> Number)
  @IsNumber()
  @Min(1)
  page: number

  @ApiProperty({example: 25})
  @Type(()=> Number)
  @IsNumber()
  @Min(1)
  max: number

}
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";
import { IsNullable } from "../../../Common/utils/IsNullable.validation";

export default class ConnectionRequestDto {
  @ApiProperty({example: "10"})
  @Type(() => Number)
  @IsNumber()
  id: number

  @ApiProperty({example: true})
  @IsNullable()
  @Type(() => Boolean)
  @IsBoolean()
  accessAll?: boolean
}
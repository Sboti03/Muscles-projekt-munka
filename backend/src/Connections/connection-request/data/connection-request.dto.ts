import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";
import { IsUndefinable } from "../../../Common/utils/IsNullable.validation";

export default class ConnectionRequestDto {
  @ApiProperty({example: "10"})
  @Type(() => Number)
  @IsNumber()
  id: number

  @ApiProperty({example: true})
  @IsUndefinable()
  @Type(() => Boolean)
  @IsBoolean()
  accessAll?: boolean
}
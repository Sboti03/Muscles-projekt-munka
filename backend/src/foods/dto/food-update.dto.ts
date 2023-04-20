import {IsNumber, IsString} from "class-validator";
import {Transform, Type} from "class-transformer";
import {UnitsEnum} from "../../Common/units/units/units";
import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNullable, IsUndefinable} from "../../Common/utils/IsNullable.validation";
import {FoodCreateDto} from "./food-create.dto";

export class FoodUpdateDto extends PartialType(FoodCreateDto) {}
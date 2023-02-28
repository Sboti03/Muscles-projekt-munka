import { Injectable } from '@nestjs/common';
import {FoodCreateDto} from "../../dto/food-create.dto";
import {Prisma} from "@prisma/client";
import {FoodUpdateDto} from "../../dto/food-update.dto";

@Injectable()
export class FoodConvertService {

    convertCreateDtoToInput(createDto:FoodCreateDto): Prisma.foodsCreateInput {
        return {
            name: createDto.name,
            fat: createDto.fat,
            fiber: createDto.fiber,
            kcal: createDto.kcal,
            carbohydrate: createDto.carbohydrate,
            perUnit: createDto.perUnit,
            protein: createDto.protein,
            unit: {connect: {unit: createDto.unit.valueOf()}},
            sugar: createDto.sugar,
            monounsaturatedFat: createDto.monounsaturatedFat,
            polyunsaturatedFat: createDto.polyunsaturatedFat,
            saturatedFat: createDto.saturatedFat
        }
    }
    convertUpdateDtoToInput(foodUpdateDto:FoodUpdateDto): Prisma.foodsUpdateInput {
        return {
            name: foodUpdateDto.name,
            fat: foodUpdateDto.fat,
            fiber: foodUpdateDto.fiber,
            kcal: foodUpdateDto.kcal,
            carbohydrate: foodUpdateDto.carbohydrate,
            perUnit: foodUpdateDto.perUnit,
            protein: foodUpdateDto.protein,
            sugar: foodUpdateDto.sugar,
            monounsaturatedFat: foodUpdateDto.monounsaturatedFat,
            polyunsaturatedFat: foodUpdateDto.polyunsaturatedFat,
            saturatedFat: foodUpdateDto.polyunsaturatedFat,
            unit: {connect: {unit: foodUpdateDto.unit.valueOf()}}
        }
    }

}

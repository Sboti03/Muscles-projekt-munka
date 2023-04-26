import { FoodCreateDto } from "../../dto/food-create.dto";
import { Prisma } from "@prisma/client";
import { FoodUpdateDto } from "../../dto/food-update.dto";
export declare class FoodConvertService {
    convertCreateDtoToInput(createDto: FoodCreateDto): Prisma.foodsCreateInput;
    convertUpdateDtoToInput(foodUpdateDto: FoodUpdateDto): Prisma.foodsUpdateInput;
}

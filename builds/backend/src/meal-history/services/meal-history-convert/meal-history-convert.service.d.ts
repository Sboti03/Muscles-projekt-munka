import { CreateMealHistoryDto } from "../../dto/createMealHistory.dto";
import { Prisma } from "@prisma/client";
import { UpdateMealHistoryDto } from "../../dto/updateMealHistory.dto";
export declare class MealHistoryConvertService {
    constructor();
    convertMealHistoryDtoToInput(dayId: number, mealId: number, createMealHistoryDTO: CreateMealHistoryDto): Promise<Prisma.mealHistoryCreateInput>;
    convertMealHistoryUpdateDtoToMealUpdateInput(updateMealHistoryDTO: UpdateMealHistoryDto): Promise<Prisma.mealsUpdateInput>;
}

import { CreateMealHistoryDto } from "../../../meal-history/dto/createMealHistory.dto";
import { Prisma } from "@prisma/client";
import { RoleEnum } from "../../../Common/Role/utils/roles";
export declare class MealGetService {
    getMealCreateInput(createMealHistoryDTO: CreateMealHistoryDto, addedBy: RoleEnum): Prisma.mealsCreateInput;
}

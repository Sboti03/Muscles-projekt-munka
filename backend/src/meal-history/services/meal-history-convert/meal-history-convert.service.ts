import {Injectable} from '@nestjs/common';
import {CreateMealHistoryDto} from "../../dto/createMealHistory.dto";
import {Prisma} from "@prisma/client";
import {UpdateMealHistoryDto} from "../../dto/updateMealHistory.dto";


@Injectable()
export class MealHistoryConvertService {

    constructor() {
    }

    async convertMealHistoryDtoToInput(dayId: number, mealId: number, createMealHistoryDTO: CreateMealHistoryDto): Promise<Prisma.mealHistoryCreateInput> {
        return {

            day: {
                connect: {
                    dayId
                }
            },
            mealPeriod: {
                connect: {
                    periodName: createMealHistoryDTO.periodName
                }
            },
            meals: {
                connect: {
                    mealId
                }
            }
        }
    }

    async convertMealHistoryUpdateDtoToMealUpdateInput(updateMealHistoryDTO: UpdateMealHistoryDto): Promise<Prisma.mealsUpdateInput> {
        return {
            amount: updateMealHistoryDTO.amount,
            completed: updateMealHistoryDTO.isCompleted,
        }
    }
}

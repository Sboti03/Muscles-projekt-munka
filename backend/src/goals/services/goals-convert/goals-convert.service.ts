import { Injectable } from '@nestjs/common';
import {GoalsUpdateDto} from "../../goals-update.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export class GoalsConvertService {
    convertGoalsUpdateDtoToInput(goalsUpdateDto:GoalsUpdateDto): Prisma.goalsUpdateInput {
        return {
            fatPerDay: goalsUpdateDto.fatPerDay,
            carbohydratesPerDay: goalsUpdateDto.carbohydratesPerDay,
            proteinPerDay: goalsUpdateDto.proteinPerDay,
            targetCalories: goalsUpdateDto.targetCalories,
            targetWeight: goalsUpdateDto.targetWeight
        }
    }

}

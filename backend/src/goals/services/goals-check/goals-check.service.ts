import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {GoalsUpdateDto} from "../../goals-update.dto";
import {GoalsGetService} from "../goals-get/goals-get.service";

@Injectable()
export class GoalsCheckService {
    constructor(private prismaService:PrismaService,
                private goalsGetService:GoalsGetService) {}

    async checkGoalsUpdateDto(goalsUpdateDto:GoalsUpdateDto, profileId: number) {
        const oldData = await this.goalsGetService.getGoalsByProfileId(profileId)
        const {fatPerDay, proteinPerDay, carbohydratesPerDay, breakfastPerDay, lunchPerDay, dinnerPerDay, otherPerDay} = Object.assign(oldData, goalsUpdateDto)
        const sumOfMacros = fatPerDay + carbohydratesPerDay + proteinPerDay

        const sumOfPeriodCalories = breakfastPerDay + lunchPerDay + dinnerPerDay + otherPerDay

        return sumOfMacros === 100 && sumOfPeriodCalories === 100;
    }
}

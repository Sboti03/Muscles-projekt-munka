import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {GoalsUpdateDto} from "../../goals-update.dto";
import {GoalsGetService} from "../goals-get/goals-get.service";

@Injectable()
export class GoalsCheckService {
    constructor(private prismaService:PrismaService,
                private goalsGetService:GoalsGetService) {}

    async checkGoalsUpdateDto(goalsUpdateDto:GoalsUpdateDto, profileId: number) {
        const oldData = await this.goalsGetService.getGoalByProfileId(profileId)
        const {fatPerDay, proteinPerDay, carbohydratesPerDay} = Object.assign(oldData, goalsUpdateDto)
        const sum = fatPerDay + carbohydratesPerDay + proteinPerDay
        return sum === 100;
    }

}

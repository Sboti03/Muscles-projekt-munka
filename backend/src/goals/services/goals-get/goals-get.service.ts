import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class GoalsGetService {
    constructor(private prismaService:PrismaService) {}

    getGoalByProfileId(profileId: number) {
        return this.prismaService.goals.findUnique({
            select: {
                fatPerDay: true,
                carbohydratesPerDay: true,
                proteinPerDay: true,
                targetCalories: true,
                targetWeight: true
            },
            where:{profileId}
        })
    }

}

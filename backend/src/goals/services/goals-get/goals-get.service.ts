import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class GoalsGetService {
    constructor(private prismaService:PrismaService) {}

    getGoalByProfileId(profileId: number) {
        return this.prismaService.goals.findFirst({
            select: {
                fatPerDay: true,
                carbohydratesPerDay: true,
                proteinPerDay: true,
                targetCalories: true,
                targetWeight: true
            },
            orderBy: {
                date: 'desc'
            },
            where: {
                profileId,
            }
        })
    }

}

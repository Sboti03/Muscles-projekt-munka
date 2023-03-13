import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class GoalsGetService {
    constructor(private prismaService:PrismaService) {}

    getGoalsByProfileId(profileId: number) {
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

    async getGoalByProfileIdAndDate(profileId: number, date: Date) {
        try {
            return await this.prismaService.goals.findFirstOrThrow({
                where: {
                    profileId: profileId,
                    date: {
                        lte: date
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            })
        } catch (e) {
            return this.prismaService.goals.findFirst({
                where: {
                    profileId: profileId
                },
                orderBy: {
                    date: 'asc'
                }
            })
        }
    }



}

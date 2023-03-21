import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {PeriodNamesEnum} from "../../../Common/utils/PeriodNames";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {GoalsGetService} from "../../../goals/services/goals-get/goals-get.service";
import {WeightHistoryGetService} from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";
import {ProfileGetService} from "../../../profile/services/profile-get/profile-get.service";

@Injectable()
export class MealHistoryGetService {
    constructor(private prismaService: PrismaService,
                private dayHistoryCheckService: DayHistoryCheckService,
                private dayHistoryGetService: DayHistoryGetService,
                private goalsGetService: GoalsGetService,
                private weightHistoryGetService: WeightHistoryGetService,
                private connectionCheckService: ConnectionCheckService,
                private profileGetService: ProfileGetService) {
    }

    getMealHistoryMealId(dayId: number, periodName: string, foodId: number) {
        return this.prismaService.mealHistory.findFirstOrThrow({
            where: {
                dayId,
                periodName,
                meal: {
                    foodId
                }
            },
            select: {
                mealId: true
            }
        });
    }

    getMealHistoryById(mealHistoryId: number) {
        return this.prismaService.mealHistory.findUniqueOrThrow({
            where: {
                mealHistoryId
            }
        })
    }

    getProfileIdByMealHistoryId(mealHistoryId: number) {
        return this.prismaService.mealHistory.findFirstOrThrow({
            where: {
                mealHistoryId
            },
            select: {
                day: {
                    select: {
                        profileId: true
                    }
                }
            },

        })
    }

    getMealIdByMealHistoryId(mealHistoryId: number) {
        return this.prismaService.mealHistory.findFirst({
            where: {
                mealHistoryId
            },
            select: {
                mealId: true
            }
        })
    }

    getAllMealHistory(dayId: number, periodName: PeriodNamesEnum) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId,
                periodName: periodName.valueOf()
            },
            include: {
                meal: {
                    include: {
                        food: {
                            include: {
                                unit: true
                            }
                        },
                    }
                },
            },
        })
    }

    getAllMealDataByDayId(dayId: number) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId
            },
            select: {
                meal: {
                    select: {
                        amount: true,
                        food: {
                            select: {
                                perUnit: true,
                                fat: true,
                                fiber: true,
                                protein: true,
                                sugar: true,
                                carbohydrate: true,
                                kcal: true
                            }
                        }
                    }
                }
            }
        })
    }

    getAllMealId(dayId: number, periodName: string) {
        return this.prismaService.mealHistory.findMany({
            select: {
                mealId: true
            },
            where: {
                periodName,
                dayId
            }
        });
    }

    getAllMeal(dayId: number, periodName: string) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId,
                periodName
            },
            include: {
                meal: {
                    include: {
                        food: {
                            include: {
                                unit: true,
                            }
                        }
                    }
                },
            }
        })
    }

    async getDayHistoryData(currentUserId: number, date: Date, id: number, currentProfileId: number, role: RoleEnum) {
        let profileId = currentProfileId
        if (id) {
            if (id === currentProfileId) {
                throw new BadRequestException('Own id')
            }
            const userId = role === RoleEnum.USER ? currentUserId : id
            const coachId = role === RoleEnum.COACH ? currentUserId : id
            if (userId === currentUserId) {
                throw new BadRequestException('Access denied')
            }
            const isConnectionExist = await this.connectionCheckService.checkExistingConnection(userId, coachId)
            if (!isConnectionExist) {
                throw new NotFoundException('No connection found')
            }
            profileId = (await this.profileGetService.getProfileIdByUserId(userId)).profileId
        }

        let dayHistory;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, date)
        if (!isDayHistoryExist) {
            dayHistory = []
        } else {
            const {dayId} = await this.dayHistoryGetService.getDayIdByDate(date, profileId)
            dayHistory = await this.getAllMealDataByDayId(dayId)
        }
        const goal = await this.goalsGetService.getGoalByProfileIdAndDate(profileId, date);
        const {
            weight,
            day: {date: weightDate}
        } = await this.weightHistoryGetService.getWeightFromDate(date, profileId)
        return {
            dayHistory: dayHistory,
            goal,
            weight: {weight, weightDate}
        }
    }
}

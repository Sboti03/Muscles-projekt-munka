import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../Common/utils/prirsma.service";
import { PeriodNamesEnum } from "../../../Common/utils/PeriodNames";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { GoalsGetService } from "../../../goals/services/goals-get/goals-get.service";
import {
    WeightHistoryGetService
} from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import { ConnectionGetService } from "../../../Connections/connection/services/connection-get/connection-get.service";

@Injectable()
export class MealHistoryGetService {
    constructor(private prismaService: PrismaService,
                private dayHistoryCheckService: DayHistoryCheckService,
                private dayHistoryGetService: DayHistoryGetService,
                private goalsGetService: GoalsGetService,
                private weightHistoryGetService: WeightHistoryGetService,
                private connectionCheckService: ConnectionCheckService,
                private profileGetService: ProfileGetService,
                private connectionGetService: ConnectionGetService) {
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
        });
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
            }

        });
    }

    getMealIdByMealHistoryId(mealHistoryId: number) {
        return this.prismaService.mealHistory.findFirst({
            where: {
                mealHistoryId
            },
            select: {
                mealId: true
            }
        });
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
                        }
                    }
                }
            }
        });
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
                                kcal: true,
                                unit: true
                            },
                        }
                    }
                }
            }
        });
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
                                unit: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getMealHistoryData(requesterId: number, date: Date, userId: number | undefined, currentProfileId: number) {
        let profileId = currentProfileId;
        if (userId) {
            await this.validateRequest(userId, requesterId);
            profileId = (await this.profileGetService.getProfileIdByUserId(userId)).profileId;
        }

        let dayHistory;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, date);
        if (!isDayHistoryExist) {
            dayHistory = [];
        } else {
            const { dayId } = await this.dayHistoryGetService.getDayIdByDate(date, profileId);
            dayHistory = await this.getAllMealDataByDayId(dayId);
        }
        const goal = await this.goalsGetService.getGoalByProfileIdAndDate(profileId, date);
        const {
            weight,
            day: { date: weightDate }
        } = await this.weightHistoryGetService.getWeightFromDate(date, profileId);
        return {
            dayHistory: dayHistory,
            goal,
            weight: { weight, weightDate }
        };
    }

    async getMealHistory(dayHistoryGetDto: MealHistoryGetDto, currentProfileId: number, currentUserId: number) {
        let profileId = currentProfileId;
        if (dayHistoryGetDto.userId) {
            await this.validateRequest(dayHistoryGetDto.userId, currentUserId);
            profileId = (await this.profileGetService.getProfileIdByUserId(dayHistoryGetDto.userId)).profileId;
        }
        const { date, periodName } = dayHistoryGetDto;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, date);
        if (!isDayHistoryExist) {
            return [];
        }
        const { dayId } = await this.dayHistoryGetService.getDayIdByDate(date, profileId);
        return this.dayHistoryGetService.getAllMealHistoryByIds(dayId, periodName);
    }

    private async validateRequest(userId: number, requesterId: number) {
        if (userId === requesterId) {
            throw new BadRequestException("Own id");
        }
        const isConnectionExist = await this.connectionCheckService.checkAccessCoachToUser(userId, requesterId);
        if (!isConnectionExist) {
            throw new NotFoundException("No connection found");
        }
        const connection = await this.connectionGetService.getConnectionByIds(userId, requesterId);
        if (connection.userId !== userId) {
            throw new ForbiddenException("Access denied");
        }
        return true;
    }

    async getMealHistoryBetween(requesterUserId: number, requesterProfileId: number, from: Date, to: Date, userId: number | undefined) {
        let profileId: number = requesterProfileId;
        if (userId) {
            await this.validateRequest(userId, requesterUserId);
            profileId = (await this.profileGetService.getProfileIdByUserId(userId)).profileId;
        }
        return this.prismaService.dayHistory.findMany({
            where: {
                profileId,
                date: {
                    lte: to,
                    gte: from
                }
            },
            select: {
                date: true,
                weightHistory: {
                    select: {
                        weight: true
                    }
                },
                mealHistory: {
                    select: {
                        periodName: true,
                        meal: {
                            select: {
                                addedBy: true,
                                completed: true,
                                amount: true,
                                food: {
                                    select: {
                                        unit: {
                                            select: {
                                                unit: true,
                                                defaultValue: true
                                            }
                                        },
                                        kcal: true,
                                        fat: true,
                                        fiber: true,
                                        sugar: true,
                                        foodId: true,
                                        protein: true,
                                        carbohydrate: true,
                                        name: true,
                                        perUnit: true,
                                    },
                                },
                            },
                        },
                    },
                },
            }
        });

    }
}

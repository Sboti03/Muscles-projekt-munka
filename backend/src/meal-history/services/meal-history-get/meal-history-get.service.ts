import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {PeriodNamesEnum} from "../../../Common/utils/PeriodNames";
@Injectable()
export class MealHistoryGetService {
    constructor(private prismaService: PrismaService) {
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
}

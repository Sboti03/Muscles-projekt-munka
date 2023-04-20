import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {PeriodNamesEnum} from "../../../Common/utils/PeriodNames";
@Injectable()
export class DayHistoryGetService {
    constructor(private prismaService: PrismaService) {
    }

    getDayIdByDate(searchedDate: Date, profileId: number) {
        return this.prismaService.dayHistory.findFirstOrThrow({
                select: {dayId: true},
            where: {date: searchedDate, profileId: profileId}
        });
    }

    getWeightByDayId(dayId: number) {
        return this.prismaService.dayHistory.findUnique({
            where: {
                dayId,
            },
            select: {
                weightHistory: {
                    select: {
                        weight: true,
                    }
                }
            }
        });
    }

    getAllWeight(profileId: number) {
        return this.prismaService.dayHistory.findMany({
            where: {
                profileId
            },
            select: {
                date: true,
                weightHistory: {
                    select: {
                        weight: true
                    }
                }
            }
        })
    }

    getLatestDayId(from: Date) {
        return this.prismaService.dayHistory.findFirst({
            where: {
              date: {
                 lte: from
              }
            },
            orderBy: {
                date: 'desc',
            },
            select: {
                date: true,
                dayId: true,
            },
        });
    }


    getAllMealHistoryByIds(dayId: number, periodName: PeriodNamesEnum) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId,
                periodName: periodName.valueOf()
            },
            select: {
                meal: {
                    select: {
                        amount: true,
                        addedBy: true,
                        completed: true,
                        food: true,
                    },
                },
                mealHistoryId: true
            }
        })
    }


}

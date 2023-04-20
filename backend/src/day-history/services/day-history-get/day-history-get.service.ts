import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {PeriodNamesEnum} from "../../../Common/utils/PeriodNames";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";
@Injectable()
export class DayHistoryGetService {
    constructor(private prismaService: PrismaService,
                private connectionCheckService:ConnectionCheckService) {
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
                        mealId: true,
                        amount: true,
                        addedBy: true,
                        completed: true,
                        food: {
                            include: {
                                unit: true
                            }
                        }
                    },
                },
                mealHistoryId: true
            }
        })
    }


    async getComment(date: Date, requesterProfileId: number, requestedProfileId?: number) {
        if (requestedProfileId) {
            await this.connectionCheckService.validateConnection(requesterProfileId, requestedProfileId)
        }
        const profileId = requestedProfileId ? requestedProfileId : requesterProfileId
        return this.prismaService.dayHistory.findUnique({
            where: {date_profileId: {date, profileId}},
            select: {
                comment: true,
                changedAt: true
            }
        })
    }
}

import { PrismaService } from "../../../Common/utils/prirsma.service";
import { PeriodNamesEnum } from "../../../Common/utils/PeriodNames";
import { ConnectionCheckService } from "../../../Connections/connection/services/connection-check/connection-check.service";
export declare class DayHistoryGetService {
    private prismaService;
    private connectionCheckService;
    constructor(prismaService: PrismaService, connectionCheckService: ConnectionCheckService);
    getDayIdByDate(searchedDate: Date, profileId: number): import(".prisma/client").Prisma.Prisma__dayHistoryClient<{
        dayId: number;
    }, never>;
    getWeightByDayId(dayId: number): import(".prisma/client").Prisma.Prisma__dayHistoryClient<{
        weightHistory: {
            weight: number;
        };
    }, never>;
    getAllWeight(profileId: number): import(".prisma/client").Prisma.PrismaPromise<{
        date: Date;
        weightHistory: {
            weight: number;
        };
    }[]>;
    getLatestDayId(from: Date): import(".prisma/client").Prisma.Prisma__dayHistoryClient<{
        date: Date;
        dayId: number;
    }, never>;
    getAllMealHistoryByIds(dayId: number, periodName: PeriodNamesEnum): import(".prisma/client").Prisma.PrismaPromise<{
        meal: {
            mealId: number;
            amount: number;
            addedBy: string;
            completed: boolean;
            food: import(".prisma/client").foods & {
                unit: import(".prisma/client").units;
            };
        };
        mealHistoryId: number;
    }[]>;
    getComment(date: Date, requesterProfileId: number, requestedProfileId?: number): Promise<{
        changedAt: Date;
        comment: string;
    }>;
}

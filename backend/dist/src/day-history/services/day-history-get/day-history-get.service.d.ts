import { PrismaService } from "../../../Common/utils/prirsma.service";
import { PeriodNamesEnum } from "../../../Common/utils/PeriodNames";
export declare class DayHistoryGetService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
            amount: number;
            addedBy: string;
            completed: boolean;
            food: import(".prisma/client").foods;
        };
        mealHistoryId: number;
    }[]>;
}

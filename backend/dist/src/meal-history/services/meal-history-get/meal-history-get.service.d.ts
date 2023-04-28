import { PrismaService } from "../../../Common/utils/prirsma.service";
import { PeriodNamesEnum } from "../../../Common/utils/PeriodNames";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { GoalsGetService } from "../../../goals/services/goals-get/goals-get.service";
import { WeightHistoryGetService } from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import { RoleEnum } from "../../../Common/Role/utils/roles";
import { ConnectionCheckService } from "../../../Connections/connection/services/connection-check/connection-check.service";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
export declare class MealHistoryGetService {
    private prismaService;
    private dayHistoryCheckService;
    private dayHistoryGetService;
    private goalsGetService;
    private weightHistoryGetService;
    private connectionCheckService;
    private profileGetService;
    constructor(prismaService: PrismaService, dayHistoryCheckService: DayHistoryCheckService, dayHistoryGetService: DayHistoryGetService, goalsGetService: GoalsGetService, weightHistoryGetService: WeightHistoryGetService, connectionCheckService: ConnectionCheckService, profileGetService: ProfileGetService);
    getMealHistoryMealId(dayId: number, periodName: string, foodId: number): import(".prisma/client").Prisma.Prisma__mealHistoryClient<{
        mealId: number;
    }, never>;
    getMealHistoryById(mealHistoryId: number): import(".prisma/client").Prisma.Prisma__mealHistoryClient<import(".prisma/client").mealHistory, never>;
    getProfileIdByMealHistoryId(mealHistoryId: number): import(".prisma/client").Prisma.Prisma__mealHistoryClient<{
        day: {
            profileId: number;
        };
    }, never>;
    getMealIdByMealHistoryId(mealHistoryId: number): import(".prisma/client").Prisma.Prisma__mealHistoryClient<{
        mealId: number;
    }, never>;
    getAllMealHistory(dayId: number, periodName: PeriodNamesEnum): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").mealHistory & {
        meal: import(".prisma/client").meals & {
            food: import(".prisma/client").foods & {
                unit: import(".prisma/client").units;
            };
        };
    })[]>;
    getAllMealDataByDayId(dayId: number): import(".prisma/client").Prisma.PrismaPromise<{
        meal: {
            amount: number;
            food: {
                kcal: number;
                perUnit: number;
                protein: number;
                fat: number;
                carbohydrate: number;
                sugar: number;
                fiber: number;
            };
        };
    }[]>;
    getAllMealId(dayId: number, periodName: string): import(".prisma/client").Prisma.PrismaPromise<{
        mealId: number;
    }[]>;
    getAllMeal(dayId: number, periodName: string): import(".prisma/client").Prisma.PrismaPromise<(import(".prisma/client").mealHistory & {
        meal: import(".prisma/client").meals & {
            food: import(".prisma/client").foods & {
                unit: import(".prisma/client").units;
            };
        };
    })[]>;
    getDayHistoryData(currentUserId: number, date: Date, id: number, currentProfileId: number, role: RoleEnum): Promise<{
        dayHistory: any;
        goal: import(".prisma/client").goals;
        weight: {
            weight: number;
            weightDate: Date;
        };
    }>;
}

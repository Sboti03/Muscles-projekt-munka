import { PrismaService } from "../../../Common/utils/prirsma.service";
import { PeriodNamesEnum } from "../../../Common/utils/PeriodNames";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { GoalsGetService } from "../../../goals/services/goals-get/goals-get.service";
import { WeightHistoryGetService } from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import { ConnectionCheckService } from "../../../Connections/connection/services/connection-check/connection-check.service";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import { ConnectionGetService } from "../../../Connections/connection/services/connection-get/connection-get.service";
export declare class MealHistoryGetService {
    private prismaService;
    private dayHistoryCheckService;
    private dayHistoryGetService;
    private goalsGetService;
    private weightHistoryGetService;
    private connectionCheckService;
    private profileGetService;
    private connectionGetService;
    constructor(prismaService: PrismaService, dayHistoryCheckService: DayHistoryCheckService, dayHistoryGetService: DayHistoryGetService, goalsGetService: GoalsGetService, weightHistoryGetService: WeightHistoryGetService, connectionCheckService: ConnectionCheckService, profileGetService: ProfileGetService, connectionGetService: ConnectionGetService);
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
            addedBy: string;
            completed: boolean;
            food: {
                unit: import(".prisma/client").units;
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
    getMealHistoryData(requesterId: number, date: Date, userId: number | undefined, currentProfileId: number): Promise<{
        dayHistory: any;
        goal: import(".prisma/client").goals;
        weight: {
            weight: number;
            weightDate: Date;
        };
    }>;
    getMealHistory(dayHistoryGetDto: MealHistoryGetDto, currentProfileId: number, currentUserId: number): Promise<{
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
    private validateRequest;
    getMealHistoryBetween(requesterUserId: number, requesterProfileId: number, from: Date, to: Date, userId: number | undefined): Promise<{
        date: Date;
        mealHistory: {
            periodName: string;
            meal: {
                amount: number;
                addedBy: string;
                completed: boolean;
                food: {
                    unit: {
                        unit: string;
                        defaultValue: number;
                    };
                    name: string;
                    kcal: number;
                    perUnit: number;
                    protein: number;
                    fat: number;
                    carbohydrate: number;
                    sugar: number;
                    fiber: number;
                    foodId: number;
                };
            };
        }[];
        weightHistory: {
            weight: number;
        };
    }[]>;
}

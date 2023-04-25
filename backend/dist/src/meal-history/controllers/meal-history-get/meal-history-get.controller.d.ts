import { PrismaService } from "../../../Common/utils/prirsma.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { MealHistoryGetService } from "../../services/meal-history-get/meal-history-get.service";
import { UserDayHistoryQuery } from "../../../Connections/connection/data/UserDayHistoryQuery";
import DayHistoryBetweenQuery from "../../dto/DayHistoryBetween.query";
export declare class MealHistoryGetController {
    private prismaService;
    private dayHistoryGetService;
    private dayHistoryCheckService;
    private mealHistoryGetService;
    constructor(prismaService: PrismaService, dayHistoryGetService: DayHistoryGetService, dayHistoryCheckService: DayHistoryCheckService, mealHistoryGetService: MealHistoryGetService);
    getMealHistory(historyGetDto: MealHistoryGetDto, currentProfileId: any, currentUserId: number): Promise<{
        meal: {
            food: import(".prisma/client").foods & {
                unit: import(".prisma/client").units;
            };
            mealId: number;
            amount: number;
            addedBy: string;
            completed: boolean;
        };
        mealHistoryId: number;
    }[]>;
    getMealHistoryData(dayHistoryQuery: UserDayHistoryQuery, currentProfileId: any, currentUserId: number): Promise<{
        dayHistory: any;
        goal: import(".prisma/client").goals;
        weight: {
            weight: number;
            weightDate: Date;
        };
    }>;
    getMealHistoryBetween(dayHistoryBetweenQuery: DayHistoryBetweenQuery, currentProfileId: number, currentUserId: number): Promise<{
        date: Date;
        mealHistory: {
            meal: {
                food: {
                    foodId: number;
                    unit: {
                        unit: string;
                        defaultValue: number;
                    };
                    kcal: number;
                    fat: number;
                    fiber: number;
                    sugar: number;
                    protein: number;
                    carbohydrate: number;
                    name: string;
                    perUnit: number;
                };
                amount: number;
                addedBy: string;
                completed: boolean;
            };
            periodName: string;
        }[];
        weightHistory: {
            weight: number;
        };
    }[]>;
}

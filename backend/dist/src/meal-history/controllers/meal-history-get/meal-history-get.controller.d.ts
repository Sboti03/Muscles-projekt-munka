import { PrismaService } from "../../../Common/utils/prirsma.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { DayHistoryCheckService } from "../../../day-history/services/day-history-check/day-history-check.service";
import { MealHistoryGetService } from "../../services/meal-history-get/meal-history-get.service";
import { GoalsGetService } from "../../../goals/services/goals-get/goals-get.service";
import { WeightHistoryGetService } from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import { UserDayHistoryQuery } from "../../../Connections/connection/data/UserDayHistoryQuery";
import { RoleEnum } from "../../../Common/Role/utils/roles";
export declare class MealHistoryGetController {
    private prismaService;
    private dayHistoryGetService;
    private dayHistoryCheckService;
    private mealHistoryGetService;
    private goalsGetService;
    private weightHistoryGetService;
    constructor(prismaService: PrismaService, dayHistoryGetService: DayHistoryGetService, dayHistoryCheckService: DayHistoryCheckService, mealHistoryGetService: MealHistoryGetService, goalsGetService: GoalsGetService, weightHistoryGetService: WeightHistoryGetService);
    getMealHistory(historyGetDto: MealHistoryGetDto, currentProfileId: any): Promise<{
        meal: {
            amount: number;
            addedBy: string;
            completed: boolean;
            food: import(".prisma/client").foods;
        };
        mealHistoryId: number;
    }[]>;
    getDayHistoryData(dayHistoryQuery: UserDayHistoryQuery, currentProfileId: any, role: RoleEnum, currentUserId: number): Promise<{
        dayHistory: any;
        goal: import(".prisma/client").goals;
        weight: {
            weight: number;
            weightDate: Date;
        };
    }>;
}

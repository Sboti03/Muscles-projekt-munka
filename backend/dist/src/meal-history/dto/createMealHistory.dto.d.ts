import { PeriodNamesEnum } from "../../Common/utils/PeriodNames";
export declare class CreateMealHistoryDto {
    periodName: PeriodNamesEnum;
    date: Date;
    foodId: number;
    amount: number;
    isCompleted?: boolean;
    userId?: number;
}

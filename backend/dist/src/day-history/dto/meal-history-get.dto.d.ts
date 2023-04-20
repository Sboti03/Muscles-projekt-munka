import { PeriodNamesEnum } from "../../Common/utils/PeriodNames";
export default class MealHistoryGetDto {
    date: Date;
    periodName: PeriodNamesEnum;
    userId?: number;
}

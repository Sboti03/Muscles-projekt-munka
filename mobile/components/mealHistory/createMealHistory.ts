import DayHistoryInterface, {PeriodNamesEnum} from "./types/dayHistoryInterface";

export default function CreateMealHistory(): DayHistoryInterface {
    return {
        amount: 250,
        date: new Date(),
        foodId: 0,
        periodName: PeriodNamesEnum.DINNER
    }
}
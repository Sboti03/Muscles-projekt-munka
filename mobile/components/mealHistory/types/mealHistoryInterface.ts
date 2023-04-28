import DayHistoryInterface from "./dayHistoryInterface";
import GoalInterface from "./goalInterface";
import WeightInterface from "./weightInterface";
import {DayPeriodResponse} from "./Meal";

export default interface MealHistoryInterface {
    dayHistory: DayPeriodResponse[] | undefined
    goal: GoalInterface
    weight: WeightInterface | undefined
}

export interface DayInfoData {
    eaten: number,
    left: number,
    eatenCarbohydrate: number,
    eatenProtein: number,
    eatenFat: number,
    weight: number | undefined,
    totalFat: number,
    totalCarbohydrate: number,
    totalProtein: number,
    progressProtein: number,
    progressFat: number,
    progressCarbohydrate: number,
    totalBreakfast: number,
    totalDinner: number,
    totalLunch: number,
    totalOther: number,


}
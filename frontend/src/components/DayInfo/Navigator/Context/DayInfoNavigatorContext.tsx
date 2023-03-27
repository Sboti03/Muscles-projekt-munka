import {createContext} from "react";
import {MealHistoryResponse} from "../../Data/MealHistoryResponse";
import {DayPeriodResponse} from "../../Data/DayPeriodResponse";


interface DayInfoNavigatorContextValue {
    dayInfoPage: DayInfoPages
    changeDayInfoPage: (page: DayInfoPages) => void
    loadFoodEdit: (dayPeriodResponse: DayPeriodResponse) => void
    foodEditMeal: DayPeriodResponse | undefined
}


export enum DayInfoPages {
    MINIMAL_DATA,
    PERIOD_INFO_DATA,
    MEAL_HISTORY_EDIT
}


const DayInfoNavigatorContext = createContext<DayInfoNavigatorContextValue>(null as any)


export default DayInfoNavigatorContext
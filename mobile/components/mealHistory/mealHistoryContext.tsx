import DayHistoryInterface, {PeriodNamesEnum} from "./types/dayHistoryInterface";
import React from "react";
import MealHistoryInterface from "./types/mealHistoryInterface";
import FoodInterface from "../food/foodInterface";
import {DayPeriodResponse} from "./types/Meal";

export interface MealHistoryContextValue {
    mealHistory: MealHistoryInterface,
    setMealHistory: (currentMealHistory: MealHistoryInterface) => void,
    dayHistories: DayPeriodResponse[],
    deleteDayHistory: (mealHistoryId: number) => void,
    mealPeriod: PeriodNamesEnum | undefined,
    foods: FoodInterface[],
    setFoods: (newFoods: FoodInterface[]) => void,
    currentPlaceOfDayPeriodResponse: number,
    setCurrentPlaceOfDayPeriodResponse: (place: number) => void,
    date: Date,
    setDate: (newDate: Date) => void,
    setMealPeriod: (periodName: PeriodNamesEnum) => void,
    updateDayHistories: (singleMealHistory: DayPeriodResponse) => void,
    // getDayHistoriesByMealPeriod: (mealPeriod: PeriodNamesEnum) => DayPeriodResponse[],
    setDayHistories: (MealHistories: DayPeriodResponse[]) => void,
    getMealPeriodCaloriesBySumCalories: (percentage: number, sumCalorie: number) => number

}

const MealHistoryContext = React.createContext<MealHistoryContextValue>(null as any)
export default MealHistoryContext
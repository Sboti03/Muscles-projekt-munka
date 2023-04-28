import {PropsWithChildren, useState} from "react";
import DayHistoryInterface, {PeriodNamesEnum} from "./types/dayHistoryInterface";
import MealHistoryContext, {MealHistoryContextValue} from "./mealHistoryContext";
import ProfileContext from "../profile/ProfileProvider";
import MealHistoryInterface from "./types/mealHistoryInterface";
import FoodInterface from "../food/foodInterface";
import {DayPeriodResponse} from "./types/Meal";

function MealHistoryContextProvider({children}: PropsWithChildren) {
    const [mealHistory, setMealHistory] = useState<MealHistoryInterface>({weight: {weight: 50, weightDate: new Date()}, dayHistory: undefined, goal: {breakfastPerDay: 30, carbohydratesPerDay: 50, date: new Date('2023-03-31T00:00:00.000Z'), dinnerPerDay: 25, fatPerDay: 20, goalId: 4, lunchPerDay: 40, otherPerDay: 5, profileId: 4, proteinPerDay: 30, targetCalories: 2000, targetWeight: 70}})
    const [dayHistories, setDayHistories] = useState<DayPeriodResponse[]>([])
    const [mealPeriod, setMealPeriod] = useState<PeriodNamesEnum>()
    const [date, setDate] = useState<Date>(new Date())
    const [foods, setFoods] = useState<FoodInterface[]>([])
    const [currentPlaceOfDayPeriodResponse, setCurrentPlaceOfDayPeriodResponse] = useState<number>(0)

    const dayHistoryContextValue: MealHistoryContextValue = {
        mealHistory: mealHistory!,
        setMealHistory: (currentMealHistory) => {
            setMealHistory(currentMealHistory)
        },
        dayHistories: dayHistories,
        mealPeriod: mealPeriod,
        date: date,
        foods: foods,
        currentPlaceOfDayPeriodResponse: currentPlaceOfDayPeriodResponse,
        deleteDayHistory: (mealHistoryId: number) => {
            setDayHistories(dayHistories.filter(currentDayHistory =>currentDayHistory.mealHistoryId !== mealHistoryId))
        },
        setCurrentPlaceOfDayPeriodResponse: (place) => {
            setCurrentPlaceOfDayPeriodResponse(place)
        },
        setFoods: (newFoods) => {
            setFoods(newFoods)
        },
        setDate: (newDate: Date) => {
            setDate(newDate)
        },
        setMealPeriod: (periodName: PeriodNamesEnum) => {
            setMealPeriod(periodName)
        },
        updateDayHistories: (singleMealHistory: DayPeriodResponse) => {
            setDayHistories(() => [...dayHistories, singleMealHistory])
        },
        // getDayHistoriesByMealPeriod: (mealPeriod:PeriodNamesEnum) => {
        //     return mealHistory?.dayHistory!.filter(currentMealHistory => currentMealHistory.meal. === mealPeriod )
        // },
        setDayHistories: (dayHistoryResponses) => {
            setDayHistories(dayHistoryResponses)
        },
        getMealPeriodCaloriesBySumCalories: (percentage, sumCalorie): number => {
            const multiplicative = percentage / 100
            console.log('MULTIPLICATIVE')
            console.log(multiplicative.toString())
            return Number(Math.round((multiplicative * sumCalorie)).toFixed(1))
        }
    }
    return(<MealHistoryContext.Provider value={dayHistoryContextValue}>
        {children}
    </MealHistoryContext.Provider>)
}
export default MealHistoryContextProvider
import DayInfoContext from "./DayInfoContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../utils/Fetch";
import {MealHistoryResponse} from "./Data/MealHistoryResponse";
import {DayInfoData} from "./Data/DayInfoData";
import {DayPeriodResponse} from "./Data/DayPeriodResponse";
import {da} from "date-fns/locale";

export default function DayInfoContextProvider(props: PropsWithChildren) {
    const [dayInfo, setDayInfo] = useState<DayInfoData | undefined>()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dayPeriodInfo, setDayPeriodInfo] = useState<DayPeriodResponse>()
    useEffect(() => {
        fetchDay(currentDate)
    }, [currentDate])

    async function fetchDay(date: Date) {
        const result = await singleFetch<MealHistoryResponse>(`/api/meal-history/data/${normalizeDate(date)}`, Methods.GET)
        if (result.error) {
            // TODO Handle error
        } else if (result.response) {
            const {response} = result
            setDayInfo(calculateDayInfoData(response))
        } else {
            // TODO handle unknown error
        }
    }

    return (
        <DayInfoContext.Provider value={{fetchDay, dayInfo, currentDate, setCurrentDate, setDayPeriodInfo, dayPeriodInfo}}>
            {props.children}
        </DayInfoContext.Provider>
    )
}


function calculateDayInfoData(mealHistoryResponse: MealHistoryResponse): DayInfoData {
    const PROTEIN_PER_KCAL = 4;
    const FAT_PER_KCAL = 9;
    const CARBOHYDRATE_PER_KCAL = 4;

    const {goal} = mealHistoryResponse

    let eatenFat = 0;
    let eatenCarbohydrate = 0;
    let eaten = 0;
    let totalCalorie = goal.targetCalories ? goal.targetCalories : 0;
    let eatenProtein = 0;

    mealHistoryResponse.dayHistory.forEach(day => {
        const perEach = (day.meal.amount) / day.meal.food.perUnit
        const {food} = day.meal
        eatenFat += food.fat * perEach;
        eatenCarbohydrate += food.carbohydrate * perEach;
        eatenProtein += food.protein * perEach;
        eaten += perEach * food.kcal
    })

    const totalProtein = totalCalorie * (goal.proteinPerDay / 100) / PROTEIN_PER_KCAL;
    const totalCarbohydrate = totalCalorie * (goal.carbohydratesPerDay / 100) / CARBOHYDRATE_PER_KCAL;
    const totalFat = totalCalorie * (goal.fatPerDay / 100) / FAT_PER_KCAL;
    const targetCalorie = goal.targetCalories ? goal.targetCalories : 2000

    const totalBreakfast = (targetCalorie * goal.breakfastPerDay) / 100
    const totalDinner = (targetCalorie * goal.dinnerPerDay) / 100
    const totalLunch = (targetCalorie * goal.lunchPerDay) / 100
    const totalOther = totalCalorie - (totalBreakfast + totalDinner + totalLunch)

    return {
        weight: mealHistoryResponse.weight.weight,
        eatenFat,
        eatenCarbohydrate,
        eaten,
        left: totalCalorie - eaten,
        eatenProtein,
        totalProtein,
        totalCarbohydrate,
        totalFat,
        progressCarbohydrate: clamp(Math.round(eatenCarbohydrate / totalCarbohydrate * 100)),
        progressProtein: clamp(Math.round(eatenCarbohydrate / totalCarbohydrate * 100)),
        progressFat: clamp(Math.round(eatenCarbohydrate / totalCarbohydrate * 100)),
        totalBreakfast,
        totalDinner,
        totalLunch,
        totalOther,
    }
}

export function normalizeDate(date?: Date) {
    if (date) {
        return date.toISOString().split('T')[0]
    }
}

const clamp = (num: number) => Math.min(Math.max(num, 0), 100);
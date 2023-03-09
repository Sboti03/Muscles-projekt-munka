import DayInfoContext from "./DayInfoContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../utils/Fetch";
import {DayHistory, MealHistoryResponse} from "./Data/MealHistoryResponse";
import {DayInfoData} from "./Data/DayInfoData";
import {getOffsetLeft} from "@mui/material";
import {da} from "date-fns/locale";

export default function DayInfoContextProvider(props: PropsWithChildren) {
    const [dayInfo, setDayInfo] = useState<DayInfoData | undefined>()
    const [currentDate, setCurrentDate] = useState(new Date(2023, 2, 11))

    useEffect(()=> {
        fetchDay(currentDate)
    }, [currentDate])

    async function fetchDay(date: Date) {
        const result = await singleFetch<MealHistoryResponse>(`/api/meal-history/data/${normalizeDate(date)}`, Methods.GET)
        if (result.error) {
            // TODO Hnalde error
        } else if (result.response) {
            const {response} = result
            setDayInfo(calculateDayInfoData(response))
        } else {
            // TODO handle unknown error
        }
    }

    return (
        <DayInfoContext.Provider value={{fetchDay, dayInfo, currentDate, setCurrentDate}}>
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
        const perEach = (day.meals.amount) / day.meals.food.perUnit
        const {food} = day.meals
        eatenFat += food.fat * perEach;
        eatenCarbohydrate += food.carbohydrate * perEach;
        eatenProtein += food.protein * perEach;
        eaten += perEach * food.kcal
    })

    const totalProtein = totalCalorie * (goal.proteinPerDay / 100) / PROTEIN_PER_KCAL;
    const totalCarbohydrate = totalCalorie * (goal.carbohydratesPerDay / 100) / CARBOHYDRATE_PER_KCAL;
    const totalFat = totalCalorie * (goal.fatPerDay / 100) / FAT_PER_KCAL;

    return  {
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
    }
}

function normalizeDate(date: Date) {
    return date.toISOString().split('T')[0]
}

const clamp = (num: number) => Math.min(Math.max(num, 0), 100);
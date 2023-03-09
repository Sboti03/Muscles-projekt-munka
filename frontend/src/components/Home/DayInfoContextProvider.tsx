import DayInfoContext from "./DayInfoContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../utils/Fetch";
import {DayHistory, HomeResponse} from "./Data/HomeResponse";
import {DayInfoData} from "./Data/DayInfoData";
import {getOffsetLeft} from "@mui/material";

export default function DayInfoContextProvider(props: PropsWithChildren) {
    const [dayInfo, setDayInfo] = useState<DayInfoData | undefined>()
    const [currentDate, setCurrentDate] = useState(new Date(2023, 2, 11))

    useEffect(()=> {
        fetchDay(currentDate)
    }, [currentDate])

    async function fetchDay(date: Date) {
        const result = await singleFetch<HomeResponse>(`/api/meal-history/data/${normalizeDate(date)}`, Methods.GET)
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


function calculateDayInfoData(homeResponse: HomeResponse): DayInfoData {
    const PROTEIN_PER_KCAL = 4;
    const FAT_PER_KCAL = 9;
    const CARBOHYDRATE_PER_KCAL = 4;
    const {goal} = homeResponse
    let eatenFat = 0;
    let eatenCarbohydrate = 0;
    let eaten = 0;
    let left = goal.targetCalories ? goal.targetCalories : 0;
    let eatenProtein = 0;
    homeResponse.dayHistory.forEach(day => {
        const {food} = day.meals
        eatenFat += food.fat;
        eatenCarbohydrate += food.carbohydrate;
        eatenProtein += food.protein;
        eaten += day.meals.amount / food.perUnit * food.kcal
    })

    const totalProtein = left * (goal.proteinPerDay / 100) / PROTEIN_PER_KCAL;
    const totalCarbohydrate = left * (goal.carbohydratesPerDay / 100) / CARBOHYDRATE_PER_KCAL;
    const totalFat = left * (goal.fatPerDay / 100) / FAT_PER_KCAL;

    return  {
        weight: homeResponse.weight.weight,
        eatenFat,
        eatenCarbohydrate,
        eaten,
        left: left - eaten,
        eatenProtein,
        totalProtein,
        totalCarbohydrate,
        totalFat,
    }
}

function normalizeDate(date: Date) {
    return date.toISOString().split('T')[0]
}
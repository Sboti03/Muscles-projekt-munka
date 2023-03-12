import {PropsWithChildren, useState} from "react";
import DayPeriodContext from "./DayPeriodContext";
import {DayPeriodName} from "./DayPeriodInfoFetch";
import {DayPeriodResponse} from "../Data/DayPeriodResponse";
import {Methods, singleFetch} from "../../utils/Fetch";

export default function DayPeriodInfoContextProvider(props: PropsWithChildren) {

    const [breakfast, setBreakfast] = useState<DayPeriodResponse[]>()
    const [dinner, setDinner] = useState<DayPeriodResponse[]>()
    const [lunch, setLunch] = useState<DayPeriodResponse[]>()
    const [other, setOther] = useState<DayPeriodResponse[]>()
    const [selectedPeriodInfo, setSelectedPeriodInfo] = useState<DayPeriodName | undefined>(undefined)

    async function setMealCompleted(completed: boolean, mealHistoryId: number) {
        const {error, response} = await singleFetch('api/meal-history/update', Methods.PATCH,
            {mealHistoryId: mealHistoryId, isCompleted: completed}
        )
        if (error) {
            // TODO handle error
            console.log(mealHistoryId)
        } else {
            console.log(response)
        }
    }

    async function deleteMealHistory(mealHistoryId: number) {
        const url = 'api/meal-history/' + mealHistoryId
        const {error, response} = await singleFetch(url, Methods.DELETE)
        if (error) {
            // TODO handle error
            console.log(mealHistoryId)
        } else {
            console.log(response)
        }
    }

    return (
        <DayPeriodContext.Provider
            value={{
                setBreakfast,
                breakfast,
                deleteMealHistory,
                setMealCompleted,
                dinner,
                lunch,
                other,
                setDinner,
                setLunch,
                selectedPeriodInfo,
                setSelectedPeriodInfo,
                setOther,
            }}
        >{props.children}</DayPeriodContext.Provider>
    )
}


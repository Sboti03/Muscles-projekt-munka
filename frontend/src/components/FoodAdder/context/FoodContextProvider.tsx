import FoodContext from "./FoodContext";
import {PropsWithChildren, useState} from "react";
import {Food} from "../FoodSearchPage";
import {Methods, singleFetch} from "../../utils/Fetch";
import {normalizeDate} from "../../DayInfo/DayInfoContextProvider";

export default function FoodContextProvider(props: PropsWithChildren) {
    const [currentDate, setCurrentDate] = useState<Date | undefined>()
    const [currentFood, setCurrentFood] = useState<Food>()
    const [periodName, setPeriodName] = useState<string>()
    const [loadingFoodAdd, setLoadingFoodAdd] = useState(false)
    async function addFood(amount: number, foodId?: number) {
        setLoadingFoodAdd(true)
        const res = await singleFetch('/api/meal-history/create', Methods.POST, {
            periodName: periodName,
            date: normalizeDate(currentDate),
            foodId: foodId ? foodId : currentFood?.foodId,
            amount
        })
        if (res.response) {
            setLoadingFoodAdd(false)
        }
    }
    return (
        <FoodContext.Provider value={{
            currentDate,
            addFood,
            loadingFoodAdd,
            periodName,
            setPeriodName,
            setCurrentDate,
            currentFood,
             setCurrentFood,
        }}>{props.children}</FoodContext.Provider>
    )
}
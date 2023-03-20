import {useContext, useEffect, useState} from "react";
import FoodContext from "./FoodContext";
import FoodSearchPage from "./FoodSearchPage";
import {FoodDetails} from "./FoodDetails/FoodDetails";
import {Methods, singleFetch} from "../utils/Fetch";
import {normalizeDate} from "../DayInfo/DayInfoContextProvider";

export default function FoodAdderPage() {

    const {currentFood, setCurrentFood, setCurrentDate, currentDate, periodName} = useContext(FoodContext)
    const [render, setRender] = useState(<FoodSearchPage />)

    async function addFood(amount: number) {
        const res = await singleFetch('/api/meal-history/create', Methods.POST, {
            periodName: periodName,
            date: normalizeDate(currentDate),
            foodId: currentFood?.foodId,
            amount
        })

        console.log(res.error, res.response)
    }

    function cancel() {
        setCurrentFood(undefined)
        setRender(<FoodSearchPage />)
    }

    useEffect(()=> {
        if (currentFood) {
            setRender(<FoodDetails food={currentFood} action={addFood} cancel={cancel} btnText="Add food" />)
        }
    }, [currentFood])

    return (
        <>
            {render}
        </>
    )
}
import {useContext, useEffect, useState} from "react";
import FoodContext from "./context/FoodContext";
import FoodSearchPage, {Food} from "./FoodSearchPage";
import {FoodDetails} from "./FoodDetails/FoodDetails";
import {Methods, singleFetch} from "../utils/Fetch";
import {normalizeDate} from "../DayInfo/context/DayInfoContextProvider";

export default function FoodAdderPage() {

    const {currentFood, setCurrentFood, addFood} = useContext(FoodContext)
    const [render, setRender] = useState(<FoodSearchPage />)



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
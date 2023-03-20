import FoodContext from "./FoodContext";
import {PropsWithChildren, useState} from "react";
import {Food} from "./FoodSearchPage";

export default function FoodContextProvider(props: PropsWithChildren) {
    const [currentDate, setCurrentDate] = useState<Date | undefined>()
    const [currentFood, setCurrentFood] = useState<Food>()
    const [periodName, setPeriodName] = useState<string>()


    return (
        <FoodContext.Provider value={{
            currentDate,
            periodName,
            setPeriodName,
            setCurrentDate,
            currentFood,
             setCurrentFood,
        }}>{props.children}</FoodContext.Provider>
    )
}
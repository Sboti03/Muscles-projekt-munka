import FoodContext from "./FoodContext";
import {PropsWithChildren, useState} from "react";
import {Food} from "./FoodSearchPage";

export default function FoodContextProvider(props: PropsWithChildren) {
    const [currentDate, setCurrentDate] = useState<Date | undefined>()
    const [currentFood, setCurrentFood] = useState<Food>()
    return (
        <FoodContext.Provider value={{
            currentDate,
            setCurrentDate,
            currentFood,
             setCurrentFood,
        }}>{props.children}</FoodContext.Provider>
    )
}
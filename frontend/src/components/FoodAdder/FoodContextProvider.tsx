import FoodContext from "./FoodContext";
import {PropsWithChildren, useState} from "react";

export default function FoodContextProvider(props: PropsWithChildren) {
    const [currentDate, setCurrentDate] = useState<Date | undefined>()
    return (
        <FoodContext.Provider value={{
            currentDate,
            setCurrentDate
        }}>{props.children}</FoodContext.Provider>
    )
}
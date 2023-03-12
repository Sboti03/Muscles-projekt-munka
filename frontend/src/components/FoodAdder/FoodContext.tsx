import {createContext} from "react";


interface FoodContextValue {
    currentDate: Date | undefined,
    setCurrentDate: (currentDate: Date) => void,

}

const FoodContext = createContext<FoodContextValue>(null as any)

export default FoodContext
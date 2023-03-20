import {createContext} from "react";
import {Food} from "./FoodSearchPage";


interface FoodContextValue {
    currentDate: Date | undefined,
    setCurrentDate: (currentDate: Date) => void,
    periodName: string | undefined,
    setPeriodName: (periodName: string) => void,
    currentFood: Food | undefined,
    setCurrentFood: (currentFood: Food | undefined) => void,
}

const FoodContext = createContext<FoodContextValue>(null as any)

export default FoodContext
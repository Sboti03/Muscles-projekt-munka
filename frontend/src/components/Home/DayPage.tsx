import {useContext, useEffect} from "react";
import AuthContext from "../Auth/AuthContext";
import HomeContextProvider from "./DayInfoContextProvider";
import DayInfoContext from "./DayInfoContext";
import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayInfoContextProvider from "./DayInfoContextProvider";

export default function HomePage() {

    return (
        <DayInfoContextProvider>
            <FoodDayInfo />
        </DayInfoContextProvider>
    )
}
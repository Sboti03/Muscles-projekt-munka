import {useContext, useEffect} from "react";
import AuthContext from "../Auth/AuthContext";
import HomeContextProvider from "./DayInfoContextProvider";
import DayInfoContext from "./DayInfoContext";
import FoodDayInfo from "./FoodDayInfo/FoodDayInfo";
import DayInfoContextProvider from "./DayInfoContextProvider";
import DayPickerBar from "./DayPicker/DayPickerBar";

export default function HomePage() {

    return (
        <DayInfoContextProvider>
            <DayPickerBar />
            <div className="full-center">
                <FoodDayInfo />
            </div>
        </DayInfoContextProvider>
    )
}
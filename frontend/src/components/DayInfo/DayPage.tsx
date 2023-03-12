import React, {useContext} from "react";
import DayInfoContextProvider from "./DayInfoContextProvider";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import './DayInfo.css'
import DayPeriodInfoContextProvider from "./DayPeriodInfo/DayPeriodInfoContextProvider";
import DayInfoNavbar from "./DayInfoNavbar";
import MinimalDayData from "./MinimalDayData";
import DayPeriodContext from "./DayPeriodInfo/DayPeriodContext";
import DayInfoNavigator from "./Navigator/DayInfoNavigator";

export default function DayPage() {

    return (
        <DayInfoContextProvider>
            <DayPeriodInfoContextProvider>
                <DayInfoNavbar />
                <DayInfoNavigator />
            </DayPeriodInfoContextProvider>
        </DayInfoContextProvider>
    )
}

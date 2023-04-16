import React, {useContext} from "react";
import DayInfoContextProvider from "./context/DayInfoContextProvider";
import DayPeriodInfo from "./DayPeriodInfo/DayPeriodInfo";
import './DayInfo.css'
import DayPeriodInfoContextProvider from "./DayPeriodInfo/context/DayPeriodInfoContextProvider";
import DayInfoNavbar from "./DayInfoNavbar";
import MinimalDayData from "./MinimalDayData";
import DayPeriodContext from "./DayPeriodInfo/context/DayPeriodContext";
import DayInfoNavigator from "./Navigator/DayInfoNavigator";
import DayInfoNavigatorContextProvider from "./Navigator/Context/DayInfoNavigatorContextProvider";
import UserCoachContext from "../UserCoach/context/UserCoachContext";

export default function DayPage() {

    return (
        <DayInfoContextProvider>
            <DayPeriodInfoContextProvider>
                <DayInfoNavigatorContextProvider>
                    <DayInfoNavbar />
                    <DayInfoNavigator />
                </DayInfoNavigatorContextProvider>
            </DayPeriodInfoContextProvider>
        </DayInfoContextProvider>
    )
}

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

export default function DayPage(props: {profileId?: number}) {

    return (
        <DayInfoContextProvider profileId={props.profileId}>
            <DayPeriodInfoContextProvider profileId={props.profileId}>
                <DayInfoNavigatorContextProvider>
                    <DayInfoNavbar />
                    <DayInfoNavigator />
                </DayInfoNavigatorContextProvider>
            </DayPeriodInfoContextProvider>
        </DayInfoContextProvider>
    )
}

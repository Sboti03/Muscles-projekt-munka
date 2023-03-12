import React, {useContext} from "react";
import DayPeriodContext from "../DayPeriodInfo/DayPeriodContext";
import MinimalDayData from "../MinimalDayData";
import DayPeriodInfo from "../DayPeriodInfo/DayPeriodInfo";
import PeriodInfoPage from "../PeriodInfo/PeriodInfoPage";

export default function DayInfoNavigator() {
    const {selectedPeriodInfo} = useContext(DayPeriodContext)

    if (selectedPeriodInfo) {
        return <PeriodInfoPage dayPeriodName={selectedPeriodInfo}/>
    }
    return <MinimalDayData/>
}
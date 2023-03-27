import {Button, Tab, TabList, TabPanel, Tabs} from "@mui/joy";
import React, {useContext, useState} from "react";
import styles from './ResultsSelector.module.css'
import {DateRange, DayPicker} from "react-day-picker";
import {da} from "date-fns/locale";
import ResultsDataView from "../ResultsDataView/ResultsDataView";
import ResultsContext from "../ResultsContext";
import {normalizeDate} from "../../DayInfo/DayInfoContextProvider";

export default function ResultSelector() {

    const {oneMonthSelect, sixMonthSelect, setNextMonth, setPrevMonth, range} = useContext(ResultsContext)

    return (
        <div>
            <div className={styles.tabContainer}>
                <div className={styles.rangeInfoContainer}>
                    <div>{normalizeDate(range.from)}</div>
                    <div>-</div>
                    <div>{normalizeDate(range.to)}</div>
                </div>
                <Tabs>
                    <TabList defaultValue={0} variant="soft">
                        <Button onClick={setPrevMonth}>{"<"}</Button>
                        <Tab value={0} onClick={oneMonthSelect}>1 month</Tab>
                        <Tab value={1} onClick={sixMonthSelect}>6 month</Tab>
                        <Button onClick={setNextMonth}>{">"}</Button>
                    </TabList>
                </Tabs>
            </div>
        </div>
    )
}
import {Button, Tab, TabList, TabPanel, Tabs} from "@mui/joy";
import React, {useContext, useState} from "react";
import styles from './ResultsSelector.module.css'
import {DateRange, DayPicker} from "react-day-picker";
import {da} from "date-fns/locale";
import ResultsDataView from "../ResultsDataView/ResultsDataView";
import ResultsContext from "../ResultsContext";
import {normalizeDate} from "../../DayInfo/context/DayInfoContextProvider";

export default function ResultSelector() {

    const {oneMonthSelect, sixMonthSelect, setNextMonth, setPrevMonth, range} = useContext(ResultsContext)

    const [isOneMonth, setIsOneMonth] = useState(true)

    function sixMonthClick() {
        if (isOneMonth) {
            sixMonthSelect()
            setIsOneMonth(false)
        }
    }

    function oneMonthClick() {
        if (!isOneMonth) {
            oneMonthSelect()
            setIsOneMonth(true)
        }
    }

    return (
        <div>
            <div className={styles.tabContainer}>
                <div className={styles.rangeInfoContainer}>
                    <div>{normalizeDate(range.from)}</div>
                    <div>-</div>
                    <div>{normalizeDate(range.to)}</div>
                </div>
                <div>
                    <div className={styles.selectContainer}>
                        <Button onClick={setPrevMonth}>{"<"}</Button>
                        <button className={`${styles.selectBtn} ${isOneMonth ? styles.selected : ''}`} onClick={oneMonthClick}>1 month</button>
                        <button className={`${styles.selectBtn}  ${!isOneMonth ? styles.selected : ''}`} onClick={sixMonthClick}>6 month</button>
                        <Button onClick={setNextMonth}>{">"}</Button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}


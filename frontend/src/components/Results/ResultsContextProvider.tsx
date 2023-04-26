import ResultsContext, {ResultsRange} from "./ResultsContext";
import {PropsWithChildren, useState} from "react";
import {da, de} from "date-fns/locale";

export default function ResultsContextProvider(props:PropsWithChildren) {




    const defaultOneMonth = new Date()
    defaultOneMonth.setMonth(defaultOneMonth.getMonth() - 1)

    const defaultThreeMonth = new Date()
    defaultThreeMonth.setMonth(defaultThreeMonth.getMonth() - 3)

    const defaultSixMonth = new Date()
    defaultSixMonth.setMonth(defaultSixMonth.getMonth() - 6)

    const defaultOneYear = new Date()
    defaultOneYear.setFullYear(defaultOneYear.getFullYear() - 1)



    const [range, setRange] = useState<ResultsRange>({from: defaultOneMonth, to: new Date()})

    function oneMonthSelect() {
        setRange({from: defaultOneMonth, to: new Date()})
    }

    function oneYearSelect() {

    }

    function sixMonthSelect() {
        setRange({from: defaultSixMonth, to: new Date()})
    }

    function threeMonthSelect() {

    }


    function setPrevMonth() {
        const fromDate = range.from
        fromDate.setMonth(fromDate.getMonth() - 1)
        const toDate = range.to
        toDate.setMonth(toDate.getMonth() - 1)
        setRange({to: toDate, from: fromDate})

    }

    function setNextMonth() {
        const fromDate = range.from
        fromDate.setMonth(fromDate.getMonth() + 1)
        const toDate = range.to
        toDate.setMonth(toDate.getMonth() + 1)
        setRange({to: toDate, from: fromDate})
    }

    return (
        <ResultsContext.Provider
        value={{
            oneMonthSelect,
            oneYearSelect,
            sixMonthSelect,
            setNextMonth,
            setPrevMonth,
            threeMonthSelect,
            range
        }}
        >{props.children}</ResultsContext.Provider>
    )
}



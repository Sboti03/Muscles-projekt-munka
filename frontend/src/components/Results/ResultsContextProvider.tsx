import ResultsContext, {ResultFilter, ResultsData, ResultsMode, ResultsRange} from "./ResultsContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../utils/Fetch";
import {normalizeDate} from "../DayInfo/context/DayInfoContextProvider";

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
    const [results, setResults] = useState<ResultsData[]>([])
    const [mode, setMode] = useState<ResultsMode>(ResultsMode.MEAL)
    const [filters, setFilters] = useState<ResultFilter>({addedBy: 'ALL', isCompleted: 'ALL', periodName: 'ALL'})
    useEffect(()=> {
        fetchResults()
    }, [range])

    async function fetchResults() {
        const result = await singleFetch<ResultsData[]>(`api/meal-history/data/between?from=${normalizeDate(range.from)}&to=${normalizeDate(range.to)}`, Methods.GET)
        if (result.response) {
            const resultsResponse = result.response.map(data => {
                return {...data, date: new Date(data.date)}
            })
            setResults(resultsResponse)
        }
    }

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
            results,
            oneMonthSelect,
            oneYearSelect,
            sixMonthSelect,
            setNextMonth,
            setPrevMonth,
            filters,
            mode,
            setMode,
            setFilters,
            threeMonthSelect,
            range
        }}
        >{props.children}</ResultsContext.Provider>
    )
}



import React from "react";

interface ResultsContextValue {
    oneMonthSelect: ()=> void,
    threeMonthSelect: ()=> void,
    sixMonthSelect: ()=> void,
    oneYearSelect: ()=> void,
    setPrevMonth: ()=> void,
    setNextMonth: ()=> void,
    range: ResultsRange

}

export interface ResultsRange {
    from: Date,
    to: Date
}

const ResultsContext = React.createContext<ResultsContextValue>(null as any)

export default ResultsContext
import ReactECharts from 'echarts-for-react';
import React, {useContext} from "react";
import ResultsContext, {MealHistory} from "../ResultsContext";
import {EChartsOption} from "echarts";
import {normalizeDate} from "../../DayInfo/context/DayInfoContextProvider";
import {RoleEnum} from "../../Types/Role";
import {DayPeriodName} from "../../DayInfo/DayPeriodInfo/DayPeriodInfoFetch";
import {Option, Select} from "@mui/joy";
import AuthContext from "../../Auth/AuthContext";
import ResultsFilter from "../ResultsFilter/ResultsFilter";

export default function ResultsDataView() {

    const {results, mode, filters, setFilters} = useContext(ResultsContext)

    function getCal(mealHistory: MealHistory[]) {
        let cal = 0
        mealHistory.forEach(meal => {
            function check() {
                if (filters.addedBy !== 'ALL') {
                    if (meal.meal.addedBy !== filters.addedBy) {
                        return false
                    }
                }
                if (filters.isCompleted !== 'ALL') {
                    if (meal.meal.completed !== filters.isCompleted) {
                        return false
                    }
                }
                if (filters.periodName !== 'ALL') {
                    if (meal.periodName !== filters.periodName) {
                        return false
                    }
                }
                return true
            }
            if (check()) {
                cal += meal.meal.food.kcal / meal.meal.food.perUnit * meal.meal.amount
            }
        })
        return cal
    }

    const option:EChartsOption = {
        xAxis: {
            type: 'category',
            data: results.map(result => normalizeDate(result.date)!)
        },
        yAxis: {
            type: 'value',

        },
        series: [{
            data: results.map(result => getCal(result.mealHistory)),
            type: 'line',
            smooth: false,
        }],

        tooltip: {
            trigger: 'axis',
        },
    }






    return (
        <>
            <ResultsFilter />
            <ReactECharts option={option} />

        </>
    )
}
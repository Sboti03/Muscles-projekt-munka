import {FoodFilter} from "./data/FoodFilter";
import {FormControl, FormLabel, Input} from "@mui/joy";
import styles from './FoodSearchPage.module.css'
import React from "react";
import FilterInput from "./FilterInput/FilterInput";
interface Props {
    opened: boolean
    filter: FoodFilter
    setFilter: (filter: FoodFilter) => void
    totalMax: TotalMax
}

export interface TotalMax {
    kcal: number
    protein: number
    fat: number
    carbohydrate: number
    sugar: number
    fiber: number
}

export default function Filter(props: Props) {
    if (props.opened) {


        const {filter, setFilter, totalMax} = props

        if (totalMax) {
            return (
                <div className={styles.filterContainer}>
                    <FilterInput totalMax={totalMax.kcal} name={"Kcal"} value={filter?.kcal} setValue={(value)=> setFilter({...filter, kcal: value})}/>
                    <FilterInput totalMax={totalMax.protein} name={"Protein"} value={filter?.protein} setValue={(value)=> setFilter({...filter, protein: value})}/>
                    <FilterInput totalMax={totalMax.fat} name={"Fat"} value={filter?.fat} setValue={(value)=> setFilter({...filter, fat: value})}/>
                    <FilterInput totalMax={totalMax.carbohydrate} name={"Carbohydrate"} value={filter?.carbohydrate} setValue={(value)=> setFilter({...filter, carbohydrate: value})}/>
                </div>
            )
        }
    }
    return <></>
}


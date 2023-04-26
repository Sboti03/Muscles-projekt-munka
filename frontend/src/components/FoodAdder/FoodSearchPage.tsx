import React, {ChangeEvent, useContext, useEffect, useMemo, useRef, useState} from "react";
import useFetch, {Methods} from "../utils/Fetch";
import {Button, Input} from "@mui/joy";
import styles from './FoodSearchPage.module.css'
import FoodContext from "./context/FoodContext";
import BackButton from "../Common/BackButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faInfo, faSearch} from "@fortawesome/free-solid-svg-icons";
import {BetweenValue, FoodFilter} from "./data/FoodFilter";
import Filter, {TotalMax} from "./Filter";
import LoadingManager from "../Loading/LoadingManager";
import {capitalize} from "@mui/material";
import ListFoods from "./ListFoods/ListFoods";
import NavigatorContext from "../Navigator/NavigatorContext";


export default function FoodSearchPage(props: {action?: Function}) {

    const {response, isLoading, error} = useFetch<Food[]>('api/food', Methods.GET)
    const {setPrevPage} = useContext(NavigatorContext)
    const totalMax = useMemo(() => calculateTotalMax(response), [response])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<FoodFilter>()
    const [filterOpened, setFilterOpened] = useState(false)
    const {action} = props

    useEffect(() => {
        if (response && totalMax) {
            setFilter(getInitFilterValues(totalMax))
        }
    }, [response, totalMax])

    const result = useMemo(() => {
        if (response && filter) {
            const {fat, carbohydrate, sugar, fiber, protein, kcal} = filter
            return response.filter(food =>
                food.name.includes(search) &&
                between(food.kcal, kcal) &&
                between(food.fat, fat) &&
                between(food.protein, protein) &&
                between(food.fiber, fiber) &&
                between(food.sugar, sugar) &&
                between(food.carbohydrate, carbohydrate))
        }
        return []
    }, [search, response, filter])
    const [addAmount, setAddAmount] = useState(100)

    function handleAction() {
        console.log(action)
        if (action) {
            action()
        } else {
            setPrevPage()
        }
    }

    return (
        <LoadingManager fullCenter={true} isLoading={isLoading}>
            <Button onClick={handleAction}>Back</Button>
            <div className={styles.foodSearchContainer}>
                <div className={styles.search}>
                    <div className={styles.foodAddValue}>
                        <Input value={addAmount} onChange={event => setAddAmount(event.target.valueAsNumber)} placeholder="default" type="number" />
                    </div>

                    <Input placeholder="Search..." type="search" value={search}
                           onChange={(e) => setSearch(e.target.value)} endDecorator={
                        <FontAwesomeIcon icon={faSearch}/>
                    }/>

                    <div>
                        <Button className={styles.filterBtn}
                                onClick={() => setFilterOpened(!filterOpened)}
                        >Filter <FontAwesomeIcon icon={faFilter}/></Button>
                    </div>
                </div>
                {totalMax && filter &&
                    <Filter totalMax={totalMax} filter={filter} setFilter={setFilter} opened={filterOpened}/>}

            </div>
            <div className={styles.foodTable}>
                <ListFoods foods={result} addAmount={addAmount} />
            </div>

        </LoadingManager>
    )
}


export interface Unit {
    unitId: number;
    unit: string;
    defaultValue: number;
    changedAt: Date;
}

export interface Food {
    foodId: number;
    name: string;
    kcal: number;
    unitId: number;
    perUnit: number;
    protein: number;
    fat: number;
    saturatedFat: number;
    polyunsaturatedFat: number;
    monounsaturatedFat: number;
    carbohydrate: number;
    sugar: number;
    fiber: number;
    changedAt: Date;
    unit: Unit;
}


function calculateTotalMax(response: Food[] | undefined): TotalMax | undefined {

    if (response) {
        return {
            kcal: Math.ceil(Math.max.apply(Math, response.map((food) => food.kcal))),
            fat: Math.ceil(Math.max.apply(Math, response.map((food) => food.fat))),
            protein: Math.ceil(Math.max.apply(Math, response.map((food) => food.protein))),
            carbohydrate: Math.ceil(Math.max.apply(Math, response.map((food) => food.carbohydrate))),
            sugar: Math.ceil(Math.max.apply(Math, response.map((food) => food.sugar))),
            fiber: Math.ceil(Math.max.apply(Math, response.map((food) => food.fiber)))
        }
    }

}

function getInitFilterValues(totalMax: TotalMax): FoodFilter {
    return {
        kcal: {min: 0, max: totalMax.kcal},
        protein: {min: 0, max: totalMax.protein},
        fat: {min: 0, max: totalMax.fat},
        sugar: {min: 0, max: totalMax.sugar},
        fiber: {min: 0, max: totalMax.fiber},
        carbohydrate: {min: 0, max: totalMax.carbohydrate},

    }
}


function between(num: number, value: BetweenValue): boolean {
    return num >= value.min && num <= value.max
}
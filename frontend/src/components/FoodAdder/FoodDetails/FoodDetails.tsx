import {Food} from "../FoodSearchPage";
import {Button, Input, Table} from "@mui/joy";
import React, {useContext, useMemo, useState} from "react";
import styles from './FoodDetails.module.css'
import {da} from "date-fns/locale";
import BackButton from "../../Common/BackButton";
import FoodContext from "../context/FoodContext";
import LoadingManager from "../../Loading/LoadingManager";

interface Props {
    food: Food
    action: (amount: number) => void,
    btnText: string,
    cancel: () => void
    initValue?: number
    isLoading?: boolean
}



export function FoodDetails(props: Props) {
    const {cancel, action, btnText, food,initValue, isLoading} = props

    const [value, setValue] = useState<number | undefined>(initValue ? initValue : food.unit.defaultValue)
    const calculatedDetails: FoodDetails = useMemo(()=> calculateFoodDetails(food, value), [value])


    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value) {
            let num = e.target.valueAsNumber
            if (num < 0) {
                num = 0
            }
            setValue(num)
        } else {
            setValue(undefined)
        }
    }

    return (
        <div className={styles.container}>
            <Button className={styles.cancelBtn} onClick={cancel}>Back</Button>
            <div>
                <h1>{upperCaseFirstLetter(food.name)}</h1>
                <div className={styles.containerBasic}>
                    <div>
                        <div className={styles.value}>{calculatedDetails.kcal}</div>
                        <div className={styles.name}>Calories</div>
                    </div>
                    <div>
                        <div>{calculatedDetails.carbohydrate}</div>
                        <div>Carbohydrate</div>
                    </div>
                    <div>
                        <div>{calculatedDetails.protein}</div>
                        <div>Protein</div>
                    </div>
                    <div>
                        <div>{calculatedDetails.fat}</div>
                        <div>Fat</div>
                    </div>
                </div>

                <div>Nutritional value</div>
                <div>
                    <div className={styles.containerNutritional}>
                        <div className={styles.base}>
                            <div>Calories</div>
                            <div>{calculatedDetails.kcal}</div>
                        </div>
                    </div>
                    <div className={styles.containerNutritional}>
                        <div className={styles.base}>
                            <div>Protein</div>
                            <div>{calculatedDetails.protein}</div>
                        </div>
                    </div>
                    <div className={styles.containerNutritional}>
                        <div className={styles.base}>
                            <div>Carbohydrate</div>
                            <div>{calculatedDetails.carbohydrate}</div>
                        </div>
                        <div>
                            <div>Sugar</div>
                            <div>{calculatedDetails.sugar}</div>
                        </div>
                        <div>
                            <div>Fiber</div>
                            <div>{calculatedDetails.fiber}</div>
                        </div>
                    </div>

                    <div className={styles.containerNutritional}>
                        <div className={styles.base}>
                            <div>Fat</div>
                            <div>{calculatedDetails.fat}</div>
                        </div>
                        <div>
                            <div>Saturated fat</div>
                            <div>{calculatedDetails.saturatedFat}</div>
                        </div>
                        <div>
                            <div>Monounsaturated fat</div>
                            <div>{calculatedDetails.monounsaturatedFat}</div>
                        </div>
                        <div>
                            <div>Polyunsaturated fat</div>
                            <div>{calculatedDetails.polyunsaturatedFat}</div>
                        </div>
                    </div>
                </div>
            </div>
            <LoadingManager isLoading={isLoading ? isLoading : false}>
                <Input type="number" value={value} onChange={handleValueChange} />
                <Button onClick={()=> action(value!)}>{btnText}</Button>
            </LoadingManager>
        </div>
    )
}


export function upperCaseFirstLetter(data: string) {
    return data.slice(0, 1).toUpperCase() + data.slice(1, data.length)
}


export interface FoodDetails {
    kcal: string;
    protein: string;
    fat: string;
    saturatedFat: string;
    polyunsaturatedFat: string;
    monounsaturatedFat: string;
    carbohydrate: string;
    sugar: string;
    fiber: string;
}

function calculateFoodDetails(food: Food, value: number | undefined): FoodDetails {
    const {kcal, fat, saturatedFat, carbohydrate, fiber, protein, sugar, monounsaturatedFat, polyunsaturatedFat} = food
    if (!value || value < 0) {
        value = 0
    }
    function get(base: number | undefined) {
        if (base) {
            return Math.round(base / food.perUnit * value!)
        } else {
            return '-'
        }
    }

    return {
        kcal: get(kcal) + ' kcal',
        fat: get(fat) + ' g',
        fiber: get(fiber) + 'g',
        carbohydrate: get(carbohydrate) + ' g',
        monounsaturatedFat: get(monounsaturatedFat) + ' g',
        polyunsaturatedFat: get(polyunsaturatedFat) + ' g',
        protein: get(protein)  + ' g',
        sugar: get(sugar)  + ' g',
        saturatedFat: get(saturatedFat) + ' g'
    };
}
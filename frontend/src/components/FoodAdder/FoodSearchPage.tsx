import {useContext, useMemo, useState} from "react";
import useFetch, {Methods} from "../utils/Fetch";
import {Button, Input} from "@mui/joy";
import styles from './FoodSearchPage.module.css'
import FoodContext from "./FoodContext";
import {Simulate} from "react-dom/test-utils";
import NavigatorContext, {Page} from "../Navigator/NavigatorContext";
import BackButton from "../Common/BackButton";

export default function FoodSearchPage() {

    const {response, isLoading, error} = useFetch<Food[]>('api/food', Methods.GET)
    const [search, setSearch] = useState('')
    const {setCurrentFood} = useContext(FoodContext)
    const result = useMemo(() => {
        return response?.filter(food => food.name.includes(search))
    }, [search, response])

    function showFood(food: Food) {
        setCurrentFood(food)
    }

    return (
        <>
            <BackButton />
            <Input type="search" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className={styles.container}>
                <div className={styles.foodResultBox}>
                    {result?.map(food => (
                        <div className={styles.food} key={food.foodId} >
                            <div>
                                {food.name}
                            </div>
                            <div>
                                {food.kcal}kcal
                            </div>
                            <Button onClick={()=> showFood(food)}>
                                Add
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
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
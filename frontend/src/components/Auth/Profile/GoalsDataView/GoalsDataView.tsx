import useFetch, {Methods, singleFetch} from "../../../utils/Fetch";
import React, {useContext, useEffect, useState} from "react";
import {Button, FormControl, FormLabel, Input} from "@mui/joy";
import {GoalsResponse} from "./GoalsResponse";
import styles from './GoalsDataView.module.css'
import {normalizeDate} from "../../../DayInfo/DayInfoContextProvider";
import NavigatorContext from "../../../Navigator/NavigatorContext";
export default function GoalsDataView() {
    const {setPrevPage} = useContext(NavigatorContext)
    const {response, error} = useFetch<GoalsResponse>('api/goals', Methods.GET)
    const [isLoading, setIsLoading] = useState(true)
    const [goalsData, setGoalsData] = useState<GoalsResponse>()
    useEffect(() => {
        setIsLoading(false)
        setGoalsData(response)
    }, [response])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const {error, response} = await singleFetch('/api/goals', Methods.PATCH, goalsData)

        if (error) {
            //TODO handle error
            console.log(error)
            console.log(goalsData)
        } else {
            console.log(response)
        }

        setIsLoading(false)

    }


    return (
        <div className={styles.formContainer}>
            <Button onClick={setPrevPage}>Back</Button>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Target weight (kg)</FormLabel>
                    <Input type="number" value={goalsData?.targetWeight} placeholder="Target weight" onChange={changeTargetWeight}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Target calories</FormLabel>
                    <Input type="number" value={goalsData?.targetCalories} placeholder="Target calories" onChange={changeTargetCalories}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Carbohydrates Per Day</FormLabel>
                    <Input type="number" value={goalsData?.carbohydratesPerDay} placeholder="Carbohydrates Per Day"
                           onChange={changeCarboPerDay}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Fat Per Day</FormLabel>
                    <Input type="number" value={goalsData?.fatPerDay} placeholder="Fat Per Day" onChange={changeFatPerDay}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Protein Per Day</FormLabel>
                    <Input type="number" value={goalsData?.proteinPerDay} placeholder="Protein Per Day"
                           onChange={changeProteinPerDay}/>
                </FormControl>
                <Button type="submit">Save</Button>
            </form>
        </div>
    )


    function changeTargetWeight(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, targetWeight: event.target.valueAsNumber})
    }

    function changeCarboPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, carbohydratesPerDay: event.target.valueAsNumber})
    }

    function changeFatPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, fatPerDay: event.target.valueAsNumber})
    }

    function changeProteinPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, proteinPerDay: event.target.valueAsNumber})

    }function changeTargetCalories(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, targetCalories: event.target.valueAsNumber})
    }

}
import useFetch, {Methods, singleFetch} from "../../utils/Fetch";
import React, {useContext, useEffect, useState} from "react";
import {Button, Divider, FormControl, FormLabel, Input} from "@mui/joy";
import {GoalsInitData, GoalsResponse} from "./GoalsResponse";
import styles from './GoalsDataView.module.css'
import NavigatorContext from "../../Navigator/NavigatorContext";
import LoadingManager from "../../Loading/LoadingManager";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";


interface Props {
    backBtn: string | undefined,
    saveBtn: string | undefined
    saveBtnAction: Function | undefined
}

export default function GoalsDataView(props: Props) {
    const {saveBtn, saveBtnAction, backBtn} = props
    const {setPrevPage} = useContext(NavigatorContext)
    const {response, error} = useFetch<GoalsResponse>('api/goals', Methods.GET)
    const [isLoading, setIsLoading] = useState(true)
    const [goalsData, setGoalsData] = useState<GoalsResponse>(GoalsInitData)
    const {t} = useTranslation()


    const macroPercent = goalsData.proteinPerDay + goalsData.fatPerDay + goalsData.carbohydratesPerDay
    const dayPercent = goalsData.breakfastPerDay + goalsData.lunchPerDay + goalsData.otherPerDay + goalsData.dinnerPerDay

    useEffect(() => {
        if (response) {
            setIsLoading(false)
            setGoalsData(response)
        }
    }, [response])

    function checkValidData() {
        const {
            carbohydratesPerDay,
            breakfastPerDay,
            lunchPerDay,
            otherPerDay,
            fatPerDay,
            dinnerPerDay,
            proteinPerDay,
            targetCalories,
            targetWeight
        } = goalsData

        if (isNaN(carbohydratesPerDay) || isNaN(proteinPerDay) || isNaN(fatPerDay)) {
            toast.error(t("goals.error.macro-percent"))
            return false
        }

        if (carbohydratesPerDay + proteinPerDay + fatPerDay !== 100) {
            toast.error(t("goals.error.macro-percent"))
            return false
        }

        if (isNaN(breakfastPerDay) || isNaN(lunchPerDay) || isNaN(otherPerDay) || isNaN(dinnerPerDay)) {
            toast.error(t("goals.error.day-percent"))
            return false
        }

        if (breakfastPerDay + lunchPerDay + otherPerDay + dinnerPerDay !== 100) {
            toast.error(t("goals.error.day-percent"))
            return false
        }
        if (isNaN(targetWeight) || targetWeight < 0) {
            toast.error(t("goals.error.less-then-0.target-weight"))
            return false;
        }

        if (isNaN(targetCalories) || targetCalories < 0) {
            toast.error(t("goals.error.less-then-0.target-cal"))
            return false;
        }

        if (isNaN(carbohydratesPerDay) || carbohydratesPerDay < 0) {
            toast.error(t("goals.error.less-then-0.carbohydrate"))
            return false;
        }
        if (isNaN(fatPerDay) || fatPerDay < 0) {
            toast.error(t("goals.error.less-then-0.fat"))
            return false;
        }
        if (isNaN(proteinPerDay) || proteinPerDay < 0) {
            toast.error(t("goals.error.less-then-0.protein"))
            return false;
        }

        if (isNaN(breakfastPerDay) || breakfastPerDay < 0) {
            toast.error(t("goals.error.less-then-0.breakfast"))
            return false;
        }
        if (isNaN(lunchPerDay) || lunchPerDay < 0) {
            toast.error(t("goals.error.less-then-0.lunch"))
            return false;
        }
        if (isNaN(dinnerPerDay) || dinnerPerDay < 0) {
            toast.error(t("goals.error.less-then-0.dinner"))
            return false;
        }
        if (isNaN(otherPerDay) || otherPerDay < 0) {
            toast.error(t("goals.error.less-then-0.other"))
            return false;
        }
        return true
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!checkValidData()) {
            return
        }
        setIsLoading(true)
        const {error, response} = await singleFetch('/api/goals', Methods.PATCH, goalsData)

        if (error) {
            //TODO handle error

        }
        setIsLoading(false)
        if (props.saveBtnAction) {
            props.saveBtnAction()
        }

    }


    return (
        <LoadingManager isLoading={isLoading}>
            <div className={styles.formContainer}>
                {
                    backBtn && <div className={styles.btn}>
                        <Button onClick={setPrevPage}>{backBtn}</Button>
                    </div>
                }
                <h1 className={"text-center font-bold text-3xl my-3"}>Goals/Day data</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={"grid grid-cols-2"}>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.target.weight")}</FormLabel>
                                <Input type="number" value={goalsData?.targetWeight}
                                       placeholder={t("goals.target.weight")!}
                                       onChange={changeTargetWeight}/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.target.cal")}</FormLabel>
                                <Input type="number" value={goalsData?.targetCalories}
                                       placeholder={t("goals.target.cal")!}
                                       onChange={changeTargetCalories}/>
                            </FormControl>
                        </div>
                    </div>
                    <Divider/>
                    <div className={"grid grid-cols-3"}>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.carbohydrate")}</FormLabel>
                                <Input type="number" value={goalsData?.carbohydratesPerDay}
                                       placeholder={t("goals.per-day.carbohydrate")!}
                                       onChange={changeCarboPerDay}/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.fat")}</FormLabel>
                                <Input type="number" value={goalsData?.fatPerDay} placeholder={t("goals.per-day.fat")!}
                                       onChange={changeFatPerDay}/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.protein")}</FormLabel>
                                <Input type="number" value={goalsData?.proteinPerDay}
                                       placeholder={t("goals.per-day.protein")!}
                                       onChange={changeProteinPerDay}/>
                            </FormControl>
                        </div>
                    </div>
                    {macroPercent !== 100 && !isNaN(macroPercent) &&
                        <div className="text-center text-gray-400">
                            {macroPercent}
                        </div>}
                    <Divider/>
                    <div className={"grid grid-cols-2"}>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.breakfast")}</FormLabel>
                                <Input type="number" value={goalsData?.breakfastPerDay}
                                       placeholder={t("goals.per-day.breakfast")!}
                                       onChange={changeBreakfastPerDay}/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.lunch")}</FormLabel>
                                <Input type="number" value={goalsData?.lunchPerDay}
                                       placeholder={t("goals.per-day.lunch")!}
                                       onChange={changeLunchPerDay}/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.dinner")}</FormLabel>
                                <Input type="number" value={goalsData?.dinnerPerDay}
                                       placeholder={t("goals.per-day.dinner")!}
                                       onChange={changeDinnerPerDay}/>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>{t("goals.per-day.other")}</FormLabel>
                                <Input type="number" value={goalsData?.otherPerDay}
                                       placeholder={t("goals.per-day.other")!}
                                       onChange={changeOtherPerDay}/>
                            </FormControl>
                        </div>
                    </div>
                    {dayPercent !== 100 && !isNaN(dayPercent) &&
                        <div className="text-center text-gray-400">
                            {dayPercent}
                        </div>}
                    {
                        saveBtn &&
                        <div className={styles.btn}>
                            <Button type="submit">{saveBtn}</Button>
                        </div>
                    }
                </form>
            </div>
        </LoadingManager>
    )


    function changeTargetWeight(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, targetWeight: parseFloat(event.target.value)})
    }

    function changeCarboPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, carbohydratesPerDay: parseFloat(event.target.value)})
    }

    function changeFatPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, fatPerDay: parseFloat(event.target.value)})
    }

    function changeProteinPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, proteinPerDay: parseFloat(event.target.value)})

    }

    function changeTargetCalories(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, targetCalories: parseFloat(event.target.value)})
    }

    function changeBreakfastPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, breakfastPerDay: parseFloat(event.target.value)})
    }

    function changeLunchPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, lunchPerDay: parseFloat(event.target.value)})
    }

    function changeDinnerPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, dinnerPerDay: parseFloat(event.target.value)})
    }

    function changeOtherPerDay(event: React.ChangeEvent<HTMLInputElement>) {
        setGoalsData({...goalsData, otherPerDay: parseFloat(event.target.value)})
    }

}
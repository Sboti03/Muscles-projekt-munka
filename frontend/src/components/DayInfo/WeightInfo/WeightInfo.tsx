import {useContext, useEffect, useRef, useState} from "react";
import DayInfoContext from "../DayInfoContext";
import styles from './WeightInfo.module.css'
import LongPressButton from "../../Common/LongPressButton";
import {Methods, singleFetch} from "../../utils/Fetch";
import {normalizeDate} from "../DayInfoContextProvider";

export  default function WeightInfo(props: {currentDate: Date, weight: number}) {
    const {currentDate} = props
    const [weight, setWeight] = useState(props.weight)

    const sendTimeOutRef = useRef<any>(undefined)

    useEffect(()=> {
        setWeight(props.weight)
    }, [props.weight])

    useEffect(()=> {
        if (weight !== props.weight) {
            if (sendTimeOutRef.current) {
                clearTimeout(sendTimeOutRef.current)
            }
            sendTimeOutRef.current = setTimeout(async ()=> {
                const res = await singleFetch('/api/weight-history/update', Methods.PATCH, {
                    date: normalizeDate(currentDate),
                    weight
                })
                console.log(res)
            }, 500)
        }
    }, [weight])

    function handleDecrease() {
        if (weight > 0.1) {
            setWeight(prevState => Math.round((prevState - 0.1) * 10) / 10)
        }
    }

    function handleIncrease() {
        setWeight(prevState => Math.round((prevState + 0.1) * 10) / 10)
    }
    function handleBigDecrease() {
        setWeight(prevState =>  {
            const newValue = Math.round((prevState - 1)  * 10) / 10
            if (newValue > 0.1) {
                return newValue
            }
            return 0.1
        })
    }

    function handleBigIncrease() {
        setWeight(prevState => Math.round((prevState + 1)  * 10) / 10)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>
                    Weight
                </div>
                <div>
                    <LongPressButton longAction={handleBigDecrease} simpleAction={handleDecrease} time={100}>-</LongPressButton>
                    <div>
                        {weight} kg
                    </div>
                    <LongPressButton longAction={handleBigIncrease} simpleAction={handleIncrease} time={100}>+</LongPressButton>
                </div>
            </div>
        </div>
    )
}
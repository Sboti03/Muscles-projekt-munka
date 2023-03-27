import {FormControl, FormLabel, Input, Slider} from "@mui/joy";
import styles from "../FoodSearchPage.module.css";
import {BetweenValue} from "../data/FoodFilter";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import FoodContext from "../context/FoodContext";
import newAccessToken from "../../Auth/Refresh/RefreshTokens";


interface Props {
    name: string
    value: BetweenValue
    setValue: (value: BetweenValue) => void
    totalMax: number
}

export default function FilterInput(props: Props) {
    const {setValue, value, name, totalMax} = props

    const [betweenValue, setBetweenValue] = useState<BetweenValue>(value ? value : {max: totalMax, min: 0})

    useEffect(()=> {
        setValue(betweenValue)
    }, [betweenValue])

    function handleChange(event: Event, newValue: number | number[]) {
        const values = newValue as number[]
        setBetweenValue({min: values[0], max: values[1]})
    }


    return (
        <div>
            <div className={styles.filterComponent}>
                <FormLabel className={styles.label}>{name}</FormLabel>
                <div className={styles.filterInfo}>
                    <div>min: {betweenValue.min}</div>
                    <div>max: {betweenValue.max}</div>
                </div>
                <div className={styles.filterInput}>

                    <Slider
                        color="primary"
                        min={0}
                        max={props.totalMax}
                        valueLabelDisplay="auto"
                        value={[betweenValue.min, betweenValue.max]} onChange={handleChange}/>
                </div>
            </div>
        </div>
    )
}

const slotProps = {
    input: {
        min: 0,
        step: 100
    }
}
import {DayPeriodName} from "./DayPeriodInfoFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

interface Props {
    totalCalories: number,
    eatenCalories?: number
    name: string
}

export default function DayPeriodInfoContainer(props: Props) {
    const {eatenCalories, totalCalories, name} = props

    const className = eatenCalories ? eatenCalories > totalCalories ? 'dpi-good' : 'dpi-bad' : 'dpi-good'
    return (
        <>
            <div className="align-left"><FontAwesomeIcon icon={faCirclePlus}/></div>
            <div className="align-center font-bold">{name}</div>
            <div className="align-right font-bold">{eatenCalories}/<span className={className}>{totalCalories}</span>kcal</div>
        </>
    )
}
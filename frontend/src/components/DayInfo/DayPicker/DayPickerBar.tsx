import 'react-day-picker/dist/style.css';
import './DayPickerBar.css'
import {DayPicker} from "react-day-picker";
import {useContext, useState} from "react";
import DayInfoContext from "../DayInfoContext";
import {da, fi} from "date-fns/locale";
import {normalizeDate} from "../DayInfoContextProvider";

export default function DayPickerBar() {

    const {setCurrentDate, currentDate} = useContext(DayInfoContext)
    const [isDaySelectorEnabled, setIsDaySelectorEnabled] = useState(false)

    function setPrevDay() {
        setCurrentDate(subtractDays(new Date(currentDate), 1))
    }

    function setNextDay() {
        setCurrentDate(subtractDays(new Date(currentDate), -1))

    }

    function setSelectedDay(selectedDay: Date | undefined) {
        if (selectedDay) {
            setCurrentDate(selectedDay)
        }
        setIsDaySelectorEnabled(false)
    }

    return (
        <>
            {isDaySelectorEnabled &&
                <div className="day-picker-component">
                    <DayPicker
                        mode="single"
                        selected={currentDate}
                        onSelect={setSelectedDay}
                    />
                </div>
            }
            <div className="day-picker-elements">
                <button onClick={setPrevDay} className="mini-btn btn">
                    {subtractDays(new Date(currentDate), 1).getDate()}
                </button>
                <button onClick={()=> setIsDaySelectorEnabled(!isDaySelectorEnabled)} className="big-btn btn">
                    {dateCompare(new Date(), currentDate) ? 'today' : currentDate.getDate()}
                </button>
                <button onClick={setNextDay} className="mini-btn btn">
                    {subtractDays(new Date(currentDate), -1).getDate()}
                </button>
            </div>
        </>
    )
}

function subtractDays(date: Date, days: number) {
    date.setDate(date.getDate() - days);
    return date;
}

function dateCompare(firstDate: Date, secondDate: Date) {
    return firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getDate() === secondDate.getDate() &&
        firstDate.getMonth() === secondDate.getMonth();

}
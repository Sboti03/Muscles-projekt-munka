import './DayPickerBar.css'
import {DayPicker} from "react-day-picker";
import {useContext, useState} from "react";
import DayInfoContext from "../DayInfoContext";
import 'react-day-picker/dist/style.css';
export default function DayPickerBar() {

    const {setCurrentDate, currentDate} = useContext(DayInfoContext)
    const [isDaySelectorEnabled, setIsDaySelectorEnabled] = useState(false)

    function openDatePicker() {

    }

    function setSelectedDay(selectedDay: Date | undefined) {
        if (selectedDay) {
            setCurrentDate(selectedDay)
        }
        setIsDaySelectorEnabled(false)
    }

    return (
        <div className="day-picker">
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
                <button className="mini-btn btn">
                    26
                </button>
                <button onClick={()=> setIsDaySelectorEnabled(!isDaySelectorEnabled)} className="big-btn btn">
                    today
                </button>
                <button className="mini-btn btn">
                    28
                </button>
            </div>
        </div>
    )
}
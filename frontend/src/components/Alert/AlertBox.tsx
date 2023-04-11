import {PropsWithChildren, useEffect, useState} from "react";
import {Alert, Button} from "@mui/joy";
import AlertBoxContext, {alertTypes} from "./AlertBoxContext";

export default function AlertBox(props: PropsWithChildren) {
    const [alert, setAlert] = useState<string>()
    const [timer, setTimer] = useState<number>()
    const [alertType, setAlertType] = useState<alertTypes>('danger')
    function setNewAlert(text: string, type?: alertTypes) {
        setAlertType(type ? type : 'danger')
        setAlert(text)
        clearInterval(timer)
        const interval = setTimeout(() => {cancel()}, 3000)
        setTimer(interval)
    }


    useEffect(() => {
        return () => {
            clearInterval(timer)
        }
    }, [])

    function cancel() {
        setAlert(undefined)
        clearInterval(timer)
    }

    function handleTimerEnd(index: number) {
        setAlert(undefined)
    }


    return (
        <AlertBoxContext.Provider value={{
            setAlertText: setNewAlert,
        }}>
            {props.children}
            {
                alert &&
                <div>
                    <Alert
                        color={alertType}
                        endDecorator={<Button onClick={cancel}>x</Button>}
                        variant={"soft"}
                    >{alert}</Alert>
                </div>
            }
        </AlertBoxContext.Provider>
    )
}
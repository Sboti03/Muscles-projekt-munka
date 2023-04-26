import {Button} from "@mui/joy";
import {PropsWithChildren, useEffect, useRef} from "react";

interface Props {
    simpleAction: () => void,
    longAction: () => void,
    time: number
}

export default function (props: PropsWithChildren<Props>) {


    const mouseTimerRef = useRef<any>(undefined)
    const waiterRef = useRef<any>(undefined)
    useEffect(() => {
        return () => stop()
    }, [])

    function stop() {
        if (mouseTimerRef.current) {
            clearInterval(mouseTimerRef.current)
            mouseTimerRef.current = undefined
        }
        if (waiterRef.current) {
            clearTimeout(waiterRef.current)
            waiterRef.current = undefined
        }
    }

    function handleMouseUp() {
        if (waiterRef.current) {
            clearInterval(waiterRef.current)
        }
        if (!mouseTimerRef.current) return;
        setTimeout(() => {
            clearInterval(mouseTimerRef.current)
            mouseTimerRef.current = undefined
        }, 10)
    }

    function handleMouseDown() {
        if (mouseTimerRef.current) return;
        waiterRef.current = setTimeout(() => {
            mouseTimerRef.current = setInterval(() => {
                props.longAction()
            }, 100)
        }, 500)
    }

    function handleClick() {
        if (mouseTimerRef.current) return;
        props.simpleAction()
    }


    return <Button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
                   onClick={handleClick}>{props.children}</Button>
}
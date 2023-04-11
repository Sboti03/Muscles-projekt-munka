import {createContext} from "react";


interface Values {
    setAlertText: (text: string, type?: alertTypes)=> void

}
export type alertTypes = "warning" | "primary" | "neutral" | "danger" | "info" | "success" | undefined
const AlertBoxContext = createContext<Values>(null as any)
export default AlertBoxContext
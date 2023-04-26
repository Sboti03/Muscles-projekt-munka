import React from "react";
import {User} from "../../Types/User";


interface CoachHomeContextValue {
    ownUser: any
}


const CoachHomeContext = React.createContext<CoachHomeContextValue>(null as any)

export default CoachHomeContext
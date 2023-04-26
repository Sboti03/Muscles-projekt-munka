import {PropsWithChildren, useEffect, useState} from "react";
import CoachHomeContext from "./CoachHomeContext";
import {singleFetch} from "../../utils/Fetch";

export function CoachHomeContextProvider(props: PropsWithChildren) {

    const [ownUsers, setOwnUsers] = useState<any>()

    useEffect(()=> {

    }, [])

    return (
        <CoachHomeContext.Provider
            value={ownUsers}
        >{props.children}</CoachHomeContext.Provider>
    )
}
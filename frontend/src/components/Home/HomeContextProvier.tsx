import HomeContext from "./HomeContext";
import {PropsWithChildren} from "react";
import {singleFetch} from "../utils/Fetch";

export default function HomeContextProvider(props: PropsWithChildren) {


    function fetchDay(date: Date) {
        singleFetch('/api/')
    }

    return (
        <HomeContext.Provider value={HomeContext}>

        </HomeContext.Provider>
    )
}
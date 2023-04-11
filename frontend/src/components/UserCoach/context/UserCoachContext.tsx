import {createContext, useState} from "react";
import {SearchResponse} from "../data/SearchResponse";
import {Connection, ConnectionRequestResponse, ConnectionResponse} from "../data/ConnectionResponse";

interface UserCoachContextValue {
    searchResponse: SearchResponse[] | undefined
    setSearchResponse: (searchResponse: SearchResponse[] | undefined) => void
    connections: ConnectionResponse[]
    connectionRequests: ConnectionRequestResponse[],
    showProfileId: number | undefined
    setShowProfileId: (showProfileId: number | undefined) => void
    refresh: ()=> void

}


const UserCoachContext = createContext<UserCoachContextValue>(null as any)

export default UserCoachContext
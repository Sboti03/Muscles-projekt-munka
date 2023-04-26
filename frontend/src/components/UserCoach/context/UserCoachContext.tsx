import {createContext, useState} from "react";
import {SearchResponse} from "../data/SearchResponse";
import {Connection, ConnectionRequestResponse, ConnectionResponse} from "../data/ConnectionResponse";
import {ProfileData} from "../../Profile/data/ProfileData";

interface UserCoachContextValue {
    searchResponse: SearchResponse[] | undefined
    setSearchResponse: (searchResponse: SearchResponse[] | undefined) => void
    connections: ConnectionResponse[]
    connectionRequests: ConnectionRequestResponse[],
    showProfileId: number | undefined
    setShowProfileId: (showProfileId: number | undefined) => void
    refresh: ()=> void
    profile: ProfileData | undefined

}


const UserCoachContext = createContext<UserCoachContextValue>(null as any)

export default UserCoachContext
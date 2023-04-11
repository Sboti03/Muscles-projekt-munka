import UserCoachContext from "./UserCoachContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {Methods, singleFetch} from "../../utils/Fetch";
import {SearchResponse} from "../data/SearchResponse";
import {ConnectionRequestResponse, ConnectionResponse} from "../data/ConnectionResponse";

export default function UserCoachContextProvider(props:PropsWithChildren) {

    const [searchResponse, setSearchResponse] = useState<SearchResponse[]>()
    const [connections, setConnections] = useState<ConnectionResponse[]>([])
    const [connectionRequests, setConnectionRequests] = useState<ConnectionRequestResponse[]>([])
    const [showProfileId, setShowProfileId] = useState<number>()
    useEffect(()=> {
        loadConnections().then()
    }, [])

    async function loadConnections() {
        const connectionsResponse = await singleFetch<ConnectionResponse[]>('/api/connection/all', Methods.GET)
        if (connectionsResponse.response) {
            setConnections(connectionsResponse.response)
        }
        const connectionRequests = await singleFetch<ConnectionRequestResponse[]>('/api/connection-request/all', Methods.GET)
        if (connectionRequests.response) {
            setConnectionRequests(connectionRequests.response)
        }
    }




    return (
        <UserCoachContext.Provider value={{
            refresh: loadConnections,
            showProfileId,
            setSearchResponse,
            setShowProfileId,
            searchResponse,
            connectionRequests,
            connections,
        }}>{props.children}</UserCoachContext.Provider>
    )
}
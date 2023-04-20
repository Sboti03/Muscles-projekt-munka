import ConnectionContext from "./ConnectionContext";
import {PropsWithChildren} from "react";
import {Methods, singleFetch} from "../utils/Fetch";

export default function ConnectionContextProvider(props: PropsWithChildren) {

    async function createConnectionRequest(userId: number): Promise<boolean> {
        const result = await singleFetch('/api/connection-request/create', Methods.POST, {
            id: userId,
            accessAll: true
        })
        return !!result.response;
    }


    async function acceptConnectionRequest(profileId: number): Promise<boolean> {
        const result = await singleFetch(`/api/connection/accept/${profileId}`, Methods.POST)
        return !result.error;
    }


    async function deleteConnection(profileId: number): Promise<boolean> {
        const result = await singleFetch(`/api/connection/${profileId}`, Methods.DELETE)
        return !result.error
    }

    async function deleteConnectionRequest(profileId: number) {
        const result = await singleFetch(`/api/connection-request/${profileId}`, Methods.DELETE)
        return !result.error
    }

    return (
        <ConnectionContext.Provider value={{
            createConnectionRequest,
            acceptConnectionRequest,
            deleteConnection,
            deleteConnectionRequest
        }}>{props.children}</ConnectionContext.Provider>
    )
}
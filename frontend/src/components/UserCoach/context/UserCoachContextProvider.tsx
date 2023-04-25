import UserCoachContext from "./UserCoachContext";
import {PropsWithChildren, useContext, useEffect, useState} from "react";
import {Methods, singleFetch} from "../../utils/Fetch";
import {SearchResponse} from "../data/SearchResponse";
import {ConnectionRequestResponse, ConnectionResponse} from "../data/ConnectionResponse";
import AuthContext from "../../Auth/AuthContext";
import {RoleEnum} from "../../Types/Role";
import ProfileContext from "../../Profile/context/ProfileContext";
import {ProfileData} from "../../Profile/data/ProfileData";

export default function UserCoachContextProvider(props:PropsWithChildren) {

    const [searchResponse, setSearchResponse] = useState<SearchResponse[]>()
    const [connections, setConnections] = useState<ConnectionResponse[]>([])
    const [connectionRequests, setConnectionRequests] = useState<ConnectionRequestResponse[]>([])
    const [showProfileId, setShowProfileId] = useState<number>()
    const {user} = useContext(AuthContext)
    const {fetchProfileData} = useContext(ProfileContext)
    const [profile, setProfile] = useState<ProfileData>()


    useEffect(()=> {
        if (user) {
            if (user.role.roleName !== RoleEnum.ADMIN) {
                loadConnections().then()
            }
        }

    }, [user])

    async function loadConnections() {
        console.log(user?.role.roleName)
        const connectionsResponse = await singleFetch<ConnectionResponse[]>('/api/connection/all', Methods.GET)
        if (connectionsResponse.response) {
            const accessAllConnection = connectionsResponse.response.find(connectionsResponse => connectionsResponse.accessAll)
            if (accessAllConnection) {
                if (user?.role.roleName === RoleEnum.USER) {
                    const result = await fetchProfileData(accessAllConnection.coachId)
                    if (result) {
                        setProfile(result)
                    }
                }
            }
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
            profile,
            setSearchResponse,
            setShowProfileId,
            searchResponse,
            connectionRequests,
            connections,
        }}>{props.children}</UserCoachContext.Provider>
    )
}
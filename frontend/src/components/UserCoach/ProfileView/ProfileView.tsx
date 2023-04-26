import {Methods, singleFetch} from "../../utils/Fetch";
import LoadingManager from "../../Loading/LoadingManager";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {convertResponseToData, ProfileData, ProfileResponse} from "../data/SearchResponse";
import styles from './ProfileView.module.css'
import {Button} from "@mui/joy";
import UserCoachNavigatorContext, {UserCoachPages} from "../navigator/UserCoachNavigatorContext";
import {ConnectionStatus} from "../data/ConnectionStatus";
import UserProfileDataView, {SIZE} from "../UserProfileDataView/UserProfileDataView";
import AuthContext from "../../Auth/AuthContext";
import ConnectionContext from "../../connection/ConnectionContext";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

export default function ProfileView(props: {profileId: number, connectionStatus: ConnectionStatus, changeAction?: ()=> void, size?: SIZE, refresh?: Function}){

    const {connectionStatus, profileId, changeAction, refresh} = props
    const {user} = useContext(AuthContext)
    const [profileData, setProfileData] = useState<ProfileData>()
    const {changePage} = useContext(UserCoachNavigatorContext)
    const [isLoading, setIsLoading] = useState(false)
    const {createConnectionRequest, acceptConnectionRequest, deleteConnection, deleteConnectionRequest} = useContext(ConnectionContext)
    const {t} = useTranslation()
    useEffect(()=> {
        fetchUser()
    }, [])

    const connectionStatusText = useMemo(()=> {
        switch (connectionStatus) {
            case ConnectionStatus.CONNECTED:
                return "Connected"
            case ConnectionStatus.NONE:
                return "Not connected"
            case ConnectionStatus.REQUEST:
                return "Accept connection"
            case ConnectionStatus.REQUEST_PENDING:
                return "Connection request sent"
        }
    }, [connectionStatus])

    const cancelBtn = useMemo(()=> {
        switch (connectionStatus) {
            case ConnectionStatus.NONE:
                return <></>
            case ConnectionStatus.CONNECTED:
                return <Button color="danger" onClick={handleDeleteConnection}>Delete connection</Button>
            case ConnectionStatus.REQUEST:
                return <>
                    <Button onClick={handleAcceptConnection}>Accept</Button>
                    <Button color="danger" onClick={handleDeleteConnectionRequest}>Delete request</Button>
                </>
            case ConnectionStatus.REQUEST_PENDING:
                return <Button color="danger" onClick={handleDeleteConnectionRequest}>Delete request</Button>
        }
    }, [connectionStatus])

    async function fetchUser() {
        const result = await singleFetch<ProfileResponse>(`/api/profile/search/id/${profileId}`, Methods.GET)
        if (result.response) {
            const profileData = convertResponseToData(result.response)
            setProfileData(profileData)
        } else {
            toast.error(result.error.message)
        }
        setIsLoading(false)
        if (refresh) {
            refresh()
        }
    }






    async function handleAcceptConnection() {
        const result = await acceptConnectionRequest(profileId)
        if (result) {
            fetchUser()
        } else {
            toast.error(t("connection.error.accept"))
        }

    }

    async function handleDeleteConnection() {
        const result = await deleteConnection(profileId)
        if (!result){
            toast.error(t("connection.error.accept"))
        } else {
            fetchUser()
        }
    }

    async function handleDeleteConnectionRequest() {
        const result = await deleteConnectionRequest(profileId)
        if (!result) {
            toast.error(t("connection.error.accept"))
        } else {
            fetchUser()
        }
    }
    async function handleConnectionCreate() {
        const result = await createConnectionRequest(profileData!.userId)
        if (!result) {
            // TODO handle error
        } else {
            if (changeAction) {
                changeAction()
            }
        }
    }

    return (
        <div className="m-3">
            <LoadingManager fullCenter={true} isLoading={isLoading}>
                <Button onClick={()=> changePage(UserCoachPages.BASE)}>Back</Button>
                <div className={styles.container}>
                    {profileData && <UserProfileDataView profileData={profileData} size={props.size} />}

                    <h4>{connectionStatusText}</h4>
                    {connectionStatus === ConnectionStatus.NONE &&
                        <Button onClick={handleConnectionCreate}>Connect</Button>
                    }
                    {cancelBtn}
                </div>
            </LoadingManager>
        </div>
    )
}



import React, {useContext} from "react";
import UserCoachNavigatorContext, {UserCoachPages} from "./UserCoachNavigatorContext";
import UserSearch from "../UserSearch/UserSearch";
import UserResult from "../UserResult/UserResult";
import ProfileView from "../ProfileView/ProfileView";
import UserCoachContext from "../context/UserCoachContext";
import LoadingManager from "../../Loading/LoadingManager";
import AuthContext from "../../Auth/AuthContext";
import {ConnectionStatus} from "../data/ConnectionStatus";
import Connections from "../Connections/Connections";
import {RoleEnum} from "../../Types/Role";
import UserCoachManager from "../UserCoachManager/UserCoachManager";

export default function UserCoachPageNavigator() {
    const {userCoachPage} = useContext(UserCoachNavigatorContext)
    const {user} = useContext(AuthContext)
    const {showProfileId, connections, connectionRequests, refresh} = useContext(UserCoachContext)


    const base = <div>
        <UserSearch/>
        <UserResult/>
        <Connections/>
    </div>

    switch (userCoachPage) {
        case UserCoachPages.SEARCH:
        case UserCoachPages.BASE:
            return base
        case UserCoachPages.PROFILE_VIEW:
            let status: ConnectionStatus = ConnectionStatus.NONE
            if (showProfileId) {
                if (!user) {
                    return <></>
                }


                const connectionReq = connectionRequests.find(req => {
                    if (user.role.roleName === RoleEnum.USER) {
                        return req.userId === user.userId && req.coachId === showProfileId;
                    } else {
                        return req.userId === showProfileId && req.coachId === user.userId;
                    }
                })
                console.log(connectionReq)
                if (connectionReq) {
                    status = connectionReq.requestBy === user.userId ? ConnectionStatus.REQUEST_PENDING : ConnectionStatus.REQUEST
                }else  {
                    const connection = connections.find(conn => conn.userId === user.userId || conn.coachId === user.userId)
                    if (connection) {
                        status = ConnectionStatus.CONNECTED
                    }
                }
                return <ProfileView refresh={refresh} changeAction={refresh} profileId={showProfileId} connectionStatus={status}/>;
            }
            return base
        case UserCoachPages.COACH_MANAGER:
            return <UserCoachManager />
        default:
            return <LoadingManager isLoading={!showProfileId} fullCenter={true}/>
    }
}
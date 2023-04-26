import React, {useContext} from "react";
import UserCoachContext from "../context/UserCoachContext";
import UserView from "../UserSearch/UserView";
import AuthContext from "../../Auth/AuthContext";
import UserCoachNavigatorContext, {UserCoachPages} from "../navigator/UserCoachNavigatorContext";

export default function UserResult() {
    const {connections, connectionRequests, searchResponse, setShowProfileId} = useContext(UserCoachContext)
    const {user} = useContext(AuthContext)
    const {changePage} = useContext(UserCoachNavigatorContext)
    function showProfile(profileId: number) {
        setShowProfileId(profileId)
        changePage(UserCoachPages.PROFILE_VIEW)
    }


    return (
        <div className="flex justify-center">
            {searchResponse?.map((res, key) => <UserView clickAction={showProfile} isConnected={
                !!connections.find(conn => conn.userId === user?.userId || conn.coachId === user?.userId)
            } key={key} user={res} />)}
        </div>
    )
}

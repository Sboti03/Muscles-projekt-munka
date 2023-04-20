import React, {useContext} from "react";
import UserCoachContext from "../context/UserCoachContext";
import ConnectionRequest from "./ConnectionRequest/ConnectionRequest";
import Connection from "./Connection/Connection";

export default function Connections() {
    const {connections, connectionRequests, searchResponse} = useContext(UserCoachContext)
    if (searchResponse) {
        return <></>
    }
    return (
        <>
            <div>
                {connectionRequests.map(value => <ConnectionRequest connectionRequest={value} />)}
                {connections.map(value => <Connection connection={value} />)}
            </div>
        </>
    )
}
import UserCoachNavigatorContext, {UserCoachPages} from "./UserCoachNavigatorContext";
import {PropsWithChildren, useState} from "react";

export default function UserCoachNavigator(props: PropsWithChildren) {

    const [page, setPage] = useState(UserCoachPages.BASE)

    return (
        <UserCoachNavigatorContext.Provider
        value={{
            changePage: setPage,
            userCoachPage: page
        }}>{props.children}</UserCoachNavigatorContext.Provider>
    )
}
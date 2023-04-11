import {createContext} from "react";

interface Value {
    userCoachPage: UserCoachPages
    changePage: (userCoachPage: UserCoachPages) => void
}

const UserCoachNavigatorContext = createContext<Value>(null as any)

export default UserCoachNavigatorContext
export enum UserCoachPages {
    PROFILE_VIEW,
    SEARCH,
    BASE,
    COACH_MANAGER

}
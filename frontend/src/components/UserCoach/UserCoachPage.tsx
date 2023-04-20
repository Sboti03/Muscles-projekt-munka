import UserCoachContextProvider from "./context/UserCoachContextProvider";
import UserSearch from "./UserSearch/UserSearch";
import UserResult from "./UserResult/UserResult";
import UserCoachNavigator from "./navigator/UserCoachNavigator";
import UserCoachPageNavigator from "./navigator/UserCoachPageNavigator";

export default function UserCoachPage() {
    return (
        <UserCoachNavigator>
            <UserCoachPageNavigator />
        </UserCoachNavigator>
    )
}
import './App.css'
import AuthContextProvider from "./components/Auth/AuthContextProvider";
import Pages from "./components/Navigator/Pages";
import NavigatorContextProvider from "./components/Navigator/NavigatorContextProvider";
import {CssVarsProvider,} from '@mui/joy/styles';
import FoodContextProvider from "./components/FoodAdder/context/FoodContextProvider";
import {getTheme} from "./static/JoyUi/JoyUiCSS";
import {ProfileContextProvider} from "./components/Profile/context/ProfileContextProvider";
import React, {useContext} from "react";
import ConnectionContextProvider from "./components/connection/ConnectionContextProvider";
import UserCoachContextProvider from "./components/UserCoach/context/UserCoachContextProvider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavigatorContext, {Page} from "./components/Navigator/NavigatorContext";
import {Option, Select} from "@mui/joy";
import UserCoachPageNavigator from "./components/UserCoach/navigator/UserCoachPageNavigator";
import AuthContext from "./components/Auth/AuthContext";

function PageSelector() {
    const {changePage, page} = useContext(NavigatorContext)
    const {user} = useContext(AuthContext)
    if (window.location.pathname === "/admin") {
        return (
            <>
                <Select value={page}  onChange={(event, value) => value ? changePage(value): {} } >
                    {Object.values(Page).map(page => <Option value={page} >{page}</Option>)}
                </Select>
                <div className="flex gap-4">
                    <div>{user?.userId}</div>
                    <div>{user?.email}</div>
                    <div>{user?.role.roleName}</div>
                    <div>{user?.roleId}</div>
                </div>
            </>
        )
    }
    return <></>

}

function App() {
    return (
        <CssVarsProvider theme={getTheme()}>
            <div className="background">
                <NavigatorContextProvider>
                    <AuthContextProvider>
                        <ConnectionContextProvider>
                            <ProfileContextProvider>
                                <UserCoachContextProvider>
                                    <FoodContextProvider>
                                        <Pages/>
                                        <PageSelector />
                                        <ToastContainer/>
                                    </FoodContextProvider>
                                </UserCoachContextProvider>
                            </ProfileContextProvider>
                        </ConnectionContextProvider>
                    </AuthContextProvider>
                </NavigatorContextProvider>
            </div>
        </CssVarsProvider>

    )

}

export default App






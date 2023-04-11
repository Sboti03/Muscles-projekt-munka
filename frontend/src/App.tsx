import './App.css'
import AuthContextProvider from "./components/Auth/AuthContextProvider";
import Pages from "./components/Navigator/Pages";
import NavigatorContextProvider from "./components/Navigator/NavigatorContextProvider";
import NavBar from "./static/NavBar/NavBar";
import {deepmerge} from '@mui/utils';
import {
    experimental_extendTheme as extendMuiTheme,
    shouldSkipGeneratingVar as muiShouldSkipGeneratingVar,
} from '@mui/material/styles';
import {
    CssVarsProvider,
    extendTheme as extendJoyTheme,
    shouldSkipGeneratingVar as joyShouldSkipGeneratingVar,
} from '@mui/joy/styles';
import FoodContextProvider from "./components/FoodAdder/context/FoodContextProvider";
import {getTheme} from "./static/JoyUi/JoyUiCSS";
import {ProfileContextProvider} from "./components/Profile/context/ProfileContextProvider";
import AlertBox from "./components/Alert/AlertBox";
import React from "react";
import ConnectionContextProvider from "./components/connection/ConnectionContextProvider";
import UserCoachContextProvider from "./components/UserCoach/context/UserCoachContextProvider";

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
                                        <AlertBox>
                                            <Pages/>
                                        </AlertBox>
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






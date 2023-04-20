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






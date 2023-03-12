import './App.css'
import AuthContextProvider from "./components/Auth/AuthContextProvider";
import Pages from "./components/Navigator/Pages";
import NavigatorContextProvider from "./components/Navigator/NavigatorContextProvider";
import NavBar from "./static/NavBar/NavBar";
import {CssVarsProvider, extendTheme} from "@mui/joy";
import FoodContextProvider from "./components/FoodAdder/FoodContextProvider";

function App() {
    return (
        <CssVarsProvider theme={Theme}>
            <NavigatorContextProvider>
                <AuthContextProvider>
                    <FoodContextProvider>
                        <NavBar />
                        <Pages/>
                    </FoodContextProvider>
                </AuthContextProvider>
            </NavigatorContextProvider>
        </CssVarsProvider>
    )

}

export default App


const Theme = extendTheme({
    components: {
        JoyLinearProgress: {
            styleOverrides: {
                root: props => ({
                    width: 'initial',
                    color: "white",
                    backgroundColor: 'rgba(255, 255, 255, 0.54)'
                })
            }
        }
    }
})

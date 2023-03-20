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

import FoodContextProvider from "./components/FoodAdder/FoodContextProvider";

function App() {
    return (
        <CssVarsProvider theme={extendMuiTheme(joyTheme)}>
            <NavigatorContextProvider>
                <AuthContextProvider>
                    <FoodContextProvider>
                        <NavBar/>
                        <Pages/>
                    </FoodContextProvider>
                </AuthContextProvider>
            </NavigatorContextProvider>
        </CssVarsProvider>

    )

}

export default App


const {unstable_sxConfig: muiSxConfig, ...muiTheme} = extendMuiTheme();

const {unstable_sxConfig: joySxConfig, ...joyTheme} = extendJoyTheme({
    cssVarPrefix: 'mui',
    components: {
        JoyFormLabel: {
            styleOverrides: {
                root: props => ({
                    fontSize: '16px'
                })
            }
        },
        JoyButton: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    backgroundColor: '#6F00B3',
                    '&:hover': {
                        backgroundColor: '#58008a'
                    },
                    ...ownerState.color === 'danger' && {
                        backgroundColor: '#8c0606',
                        '&:hover': {
                            backgroundColor: '#790808'
                        },
                    }
                }),
            }
        },
        JoyLinearProgress: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    width: 'initial',
                    color: "white",
                    backgroundColor: 'rgba(255, 255, 255, 0.54)',
                })
            }
        }
    }
})





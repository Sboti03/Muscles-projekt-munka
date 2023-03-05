import './App.css'
import AuthContextProvider from "./components/Auth/AuthContextProvider";
import Pages from "./components/Navigator/Pages";
import NavigatorContextProvider from "./components/Navigator/NavigatorContextProvider";

function App() {
    return (
        <NavigatorContextProvider>
            <AuthContextProvider>
                <Pages/>
            </AuthContextProvider>
        </NavigatorContextProvider>
    )

}

export default App
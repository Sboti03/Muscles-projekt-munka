import './App.css'
import AuthContextProvider from "./components/Auth/AuthContextProvider";
import Pages from "./components/Navigator/Pages";
import NavigatorContextProvider from "./components/Navigator/NavigatorContextProvider";
import NavBar from "./static/NavBar/NavBar";

function App() {
    return (
        <NavigatorContextProvider>
            <AuthContextProvider>
                <NavBar />
                <Pages/>
            </AuthContextProvider>
        </NavigatorContextProvider>
    )

}

export default App
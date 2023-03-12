import {useContext} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";
import DayPage from "../DayInfo/DayPage";
import AdminPage from "../Admin/AdminPage";
import RegisterPage from "../Auth/Register/Register Page";
import FoodSearchPage from "../FoodAdder/FoodSearchPage";

export default function Pages() {

    const {page} = useContext(NavigatorContext)

    switch (page) {
        case Page.LOGIN:
            return <LoginPage />
        case Page.HOME:
            return <DayPage />
        case Page.REGISTER:
            return <RegisterPage />
        case Page.ADMIN:
            return <AdminPage />
        case Page.FOOD_SEARCH:
            return <FoodSearchPage />
    }
}

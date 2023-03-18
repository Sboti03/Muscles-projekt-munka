import {useContext} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";
import DayPage from "../DayInfo/DayPage";
import AdminPage from "../Admin/AdminPage";
import RegisterPage from "../Auth/Register/Register Page";
import FoodSearchPage from "../FoodAdder/FoodSearchPage";
import ProfileCreatePage from "../Profile/ProfileCreatePage";
import ProfileViewPage from "../Profile/ProfileViewPage";
import ProfileDataView from "../Profile/ProfileDataView/ProfileDataView";
import ProfileDataEditSelector from "../Profile/ProfileDataEditSelector";
import GoalsDataView from "../Profile/GoalsDataView/GoalsDataView";

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
        case Page.PROFILE_CREATE:
            return <ProfileCreatePage />
        case Page.PROFILE_VIEW:
            return <ProfileDataEditSelector />
        case Page.PROFILE_DATA:
            return <ProfileDataView />
        case Page.GOALS:
            return <GoalsDataView />
        default:
            return <div>UN</div>
    }
}

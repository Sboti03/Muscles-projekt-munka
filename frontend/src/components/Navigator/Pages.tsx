import React, {useContext} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";
import DayPage from "../DayInfo/DayPage";
import AdminPage from "../Admin/AdminPage";
import RegisterPage from "../Auth/Register/Register Page";
import ProfileCreatePage from "../Profile/ProfileCreatePage";
import ProfileDataView from "../Profile/ProfileDataView/ProfileDataView";
import ProfileDataEditSelector from "../Profile/ProfileDataEditSelector";
import GoalsDataView from "../Profile/GoalsDataView/GoalsDataView";
import FoodAdderPage from "../FoodAdder/FoodAdderPage";
import {CoachHomePage} from "../Coach home/CoachHomePage";

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
            return <FoodAdderPage />
        case Page.PROFILE_CREATE:
            return <ProfileCreatePage />
        case Page.PROFILE_VIEW:
            return <ProfileDataEditSelector />
        case Page.PROFILE_DATA:
            return <ProfileDataView backBtn={"Back"} saveBtn={"Save"} saveBtnAction={undefined} />
        case Page.GOALS:
            return <GoalsDataView backBtn={"Back"} saveBtn={"Save"} saveBtnAction={undefined}/>
        case Page.COACH_HOME:
            return <CoachHomePage />
        default:
            return <div>UN</div>
    }
}

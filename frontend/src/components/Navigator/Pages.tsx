import React, {useContext, useEffect, useState} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";
import DayPage from "../DayInfo/DayPage";
import AdminPage from "../Admin/AdminPage";
import RegisterPage from "../Auth/Register/Register Page";
import ProfileCreatePage from "../Profile/ProfileCreatePage";
import ProfileDataEditSelector from "../Profile/ProfileDataEditSelector";
import GoalsDataView from "../Profile/GoalsDataView/GoalsDataView";
import FoodAdderPage from "../FoodAdder/FoodAdderPage";
import {CoachHomePage} from "../Coach home/CoachHomePage";
import LoadingManager from "../Loading/LoadingManager";
import ResultsPage from "../Results/ResultsPage";
import ProfileViewPage from "../Profile/ProfileDataViewPage/ProfileViewPage";
import UserCoachPage from "../UserCoach/UserCoachPage";
import WelcomePage from "../Welcome/WelcomePage";
import AdminPageContextProvider from "../Admin/Context/AdminPageContextProvider";

export default function Pages() {

    const {page} = useContext(NavigatorContext)

    useEffect(()=> {
        console.log(page)
    }, [page])

    switch (page) {
        case Page.ADMIN:
            return <AdminPageContextProvider>
                <AdminPage />
            </AdminPageContextProvider>
        case Page.LOGIN:
            return <LoginPage />
        case Page.HOME:
            return <DayPage />
        case Page.REGISTER:
            return <RegisterPage />
        case Page.FOOD_SEARCH:
            return <FoodAdderPage />
        case Page.PROFILE_CREATE:
            return <ProfileCreatePage />
        case Page.PROFILE_VIEW:
            return <ProfileDataEditSelector />
        case Page.PROFILE_DATA:
            return <ProfileViewPage />
        case Page.GOALS:
            return <GoalsDataView backBtn={"Back"} saveBtn={"Save"} saveBtnAction={undefined}/>
        case Page.COACH_HOME:
            return <CoachHomePage />
        case Page.RESULTS:
            return <ResultsPage />
        case Page.USER_COACH:
            return <UserCoachPage />
        case Page.WELCOME:
            return <WelcomePage />
        default:
            return (
                <div className="full-height full-center">
                    asd
                </div>
            )
    }
}

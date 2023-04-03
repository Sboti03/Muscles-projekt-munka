import {useContext} from "react";
import NavigatorProvider, {Page} from "./NavigatorProvider";
import LoginPage from "../loginPage";
import HomePage from "../home/homePage";
import RegisterPage from "../register/registerpage";
import AdminPage from "../admin/adminPage";
import ProfileFormPages from "../profile/ProfileFormPages";
import ProfileInformation from "../profile/ProfileInformation";
import CreateMealHistory from "../mealHistory/pages/CreateMealHistory";
import ShowMealHistory from "../mealHistory/pages/ShowMealHistory";
import ShowOneFood from "../food/ShowOneFood";
import MealHistoryContext from "../mealHistory/mealHistoryContext";
import CalendarPage from "../Calendar/CalendarPage";

export default function Pages() {

   const {dayHistories, currentPlaceOfDayPeriodResponse} = useContext(MealHistoryContext)
   const {page} = useContext(NavigatorProvider)

   switch (page) {
      case Page.LOGIN:
         return <LoginPage />
      case Page.HOME:
         return <HomePage />
      case Page.REGISTER:
         return <RegisterPage />
      case Page.ADMIN:
         return <AdminPage />
      case Page.NAMEFORM:
         return <ProfileFormPages birthDay={false} />
      case Page.BIRTHDAYANDWEIGHT:
         return <ProfileFormPages birthDay={true} />
      case Page.PROFILE:
         return <ProfileInformation />
      case Page.CREATEMEALHISTORY:
         return <CreateMealHistory />
      case Page.SHOWMEALHISTORY:
         return <ShowMealHistory />
      case Page.SHOWFODDETAILS:
         return <ShowOneFood DayPeriodResponse={dayHistories[currentPlaceOfDayPeriodResponse]}/>
      case Page.CALENDAR:
         return <CalendarPage />
   }
}
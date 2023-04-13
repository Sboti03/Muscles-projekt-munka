import {useContext, useEffect} from "react";
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
import CalendarPage from "../calendar/CalendarPage";
import PageHistoryContext from "../pageHistory/PageHistoryProvider";
import {Alert, BackHandler} from "react-native";
import MyGoal from "../home/goals/myGoal";

export default function Pages() {

   const {dayHistories, currentPlaceOfDayPeriodResponse} = useContext(MealHistoryContext)
   const {page, changePage} = useContext(NavigatorProvider)
   const {pageHistory, deleteLastPage} = useContext(PageHistoryContext)

   useEffect(() => {
      const backAction = () => {
         Alert.alert('Hold on!', 'Are you sure you want to exit?', [
            {
               text: 'Cancel',
               onPress: () => null,
               style: 'cancel',
            },
            {text: 'YES', onPress: () => {
                  console.log(pageHistory)
                  BackHandler.exitApp()
               }},
         ]);
         return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
         if (pageHistory[pageHistory.length - 1] === Page.HOME || pageHistory[pageHistory.length - 1] === Page.LOGIN || pageHistory[pageHistory.length - 1] === Page.REGISTER|| pageHistory[pageHistory.length - 1] === Page.NAMEFORM|| pageHistory[pageHistory.length - 1] === Page.BIRTHDAYANDWEIGHT) {
            console.log(pageHistory)
            backAction()
         } else {
            console.log(pageHistory)
            changePage(pageHistory[pageHistory.length - 2])
            deleteLastPage()
            return true
         }
          });
   }, [])

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
      case Page.MYGOAL:
         return <MyGoal />
   }
}
import {useContext} from "react";
import NavigatorProvider, {Page} from "./NavigatorProvider";
import LoginPage from "../loginPage";
import HomePage from "../home/homePage";
import RegisterPage from "../register/registerpage";
import AdminPage from "../admin/adminPage";
import ProfileFormPages from "../profile/ProfileFormPages";

export default function Pages() {

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
      case Page.NAME:
         return <ProfileFormPages birthDay={false} />
      case Page.BIRTHDAYANDWEIGHT:
         return <ProfileFormPages birthDay={true} />
   }
}
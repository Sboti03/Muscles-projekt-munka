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
      case Page.FIRSTNAME:
         return <ProfileFormPages placeHolder={'FirstName'} />
      case Page.LASTNAME:
         return <ProfileFormPages placeHolder={'LastName'} />
      case Page.BIRTHDAY:
         return <ProfileFormPages placeHolder={'Birthdate'} />
      case Page.TARGETWEIGHT:
         return <ProfileFormPages placeHolder={'TargetWeight'} skipButton={true}/>
   }
}
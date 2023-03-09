import {useContext} from "react";
import NavigatorProvider, {Page} from "./NavigatorProvider";
import LoginPage from "../loginPage";
import HomePage from "../home/homePage";
import RegisterPage from "../register/registerpage";
import AdminPage from "../admin/adminPage";

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
   }
}
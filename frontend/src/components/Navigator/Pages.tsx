import {PropsWithChildren, useContext, useState} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";
import HomePage from "../Home/HomePage";
import AdminPage from "../Admin/AdminPage";

export default function Pages() {

    const {page} = useContext(NavigatorContext)

    switch (page) {
        case Page.LOGIN:
            return <LoginPage />
        case Page.HOME:
            return <HomePage />
        case Page.REGISTER:
            return <LoginPage />
        case Page.ADMIN:
            return <AdminPage />
    }
}

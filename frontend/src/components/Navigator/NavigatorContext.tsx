import React from "react";


interface NavigatorContextValue {
    page: Page | undefined,
    changePage: (page: Page) => void,
    pageHistory: Page[],
    setPrevPage: ()=> void,
}


export enum Page {
    LOGIN= 'login',
    REGISTER = 'register',
    HOME = 'home',
    ADMIN = 'admin',
    FOOD_SEARCH = 'food_search',
    PROFILE_CREATE = 'profile_create',
    PROFILE_VIEW = "PROFILE_VIEW",
    RESULTS = "RESULTS",
    GOALS = "GOALS",
    PROFILE_DATA = "PROFILE_DATA",
}


const NavigatorContext = React.createContext<NavigatorContextValue>(null as any)
export default NavigatorContext
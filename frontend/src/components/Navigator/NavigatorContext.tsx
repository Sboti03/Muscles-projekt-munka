import React from "react";


interface NavigatorContextValue {
    page: Page | undefined,
    changePage: (page: Page) => void
}


export enum Page {
    LOGIN,
    REGISTER,
    HOME,
    ADMIN,
    FOOD_SEARCH,
}


const NavigatorContext = React.createContext<NavigatorContextValue>(null as any)
export default NavigatorContext
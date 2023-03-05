import React from "react";


interface NavigatorContextValue {
    page: Page,
    changePage: (page: Page) => void
}


export enum Page {
    LOGIN,
    REGISTER,
    HOME,
    ADMIN,

}


const NavigatorContext = React.createContext<NavigatorContextValue>(null as any)
export default NavigatorContext
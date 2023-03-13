import React from "react";


export interface NavigatorContextValue {
   page: Page,
   changePage: (page: Page) => void
}


export enum Page {
   LOGIN,
   REGISTER,
   HOME,
   ADMIN,
   FIRSTNAME,
   LASTNAME,
   BIRTHDAY,
   TARGETWEIGHT,

}


const NavigatorContext = React.createContext<NavigatorContextValue>(null as any)
export default NavigatorContext
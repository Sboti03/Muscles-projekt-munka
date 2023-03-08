import React from "react";

export interface HomeContextValue {

}


const HomeContext = React.createContext<HomeContextValue>(null as any)


export default HomeContext
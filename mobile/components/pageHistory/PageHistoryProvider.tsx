import {Page} from "../navigator/NavigatorProvider";
import React from "react";

export interface PageHistoryContextValue{
    pageHistory: Page[],
    addPage: (newPage: Page) => void,
    deleteLastPage: () => void,
    onLogout: () => void
}
const PageHistoryContext = React.createContext<PageHistoryContextValue>(null as any)
export default PageHistoryContext
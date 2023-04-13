import {PropsWithChildren, useState} from "react";
import {Page} from "../navigator/NavigatorProvider";
import PageHistoryContext, {PageHistoryContextValue} from "./PageHistoryProvider";
import ProfileContext from "../profile/ProfileProvider";

export default function PageHistoryContextProvider({children}: PropsWithChildren) {
    const [pageHistory, setPageHistory] = useState<Page[]>([Page.LOGIN])

    const PHContextValue: PageHistoryContextValue = {
        pageHistory,
        addPage: (newPage) => {
            setPageHistory(current => [...current, newPage])
        },
        deleteLastPage: () => {
            const newHistory = pageHistory
            newHistory.pop()
            setPageHistory(newHistory)
        },
        onLogout: () => {
            setPageHistory([Page.LOGIN])
        }
    }
    return(<PageHistoryContext.Provider value={PHContextValue}>
        {children}
    </PageHistoryContext.Provider>)
}
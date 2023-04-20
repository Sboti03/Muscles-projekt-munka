import {PropsWithChildren, useMemo, useState} from "react";
import NavigatorContext, {Page} from "./NavigatorContext";
import LoginPage from "../Auth/Login/LoginPage";

export default function NavigatorContextProvider(props:PropsWithChildren) {


    const [pageHistory, setPageHistory] = useState<Page[]>([])
    const [page, setPage] = useState<Page>()

    function changePage(page: Page) {
        let oldPages = pageHistory
        oldPages.push(page)
        setPageHistory(oldPages)
        setPage(page)
    }

    function setPrevPage() {
        setPageHistory(prevState => {
            let newPages = prevState
            newPages.pop()
            setPage(newPages[newPages.length -1])
            return newPages
        })
    }

    return (
        <NavigatorContext.Provider value={{page, changePage, pageHistory, setPrevPage}}>
            {props.children}
        </NavigatorContext.Provider>
    )
}

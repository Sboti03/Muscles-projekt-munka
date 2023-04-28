import NavigatorProvider, {NavigatorContextValue, Page} from "./NavigatorProvider";
import {PropsWithChildren, useState} from "react";

export default function NavigatorContextProvider({children}: PropsWithChildren) {
   const [page, setPage] = useState<Page>(Page.LOGIN)

   const navigatorContextValue: NavigatorContextValue = {
      page: page,
      changePage: (page:Page) => {
         setPage(page)
      }
   }
   return (
      <NavigatorProvider.Provider value={navigatorContextValue}>
         {children}
      </NavigatorProvider.Provider>
   )
}
import styles from './Results.module.css'
import ResultsContextProvider from "./ResultsContextProvider";
import React, {useContext} from "react";
import ResultsDataView from "./ResultsDataView/ResultsDataView";
import ResultSelector from "./ResultSelector/ResultSelector";
import NavigatorContext from "../Navigator/NavigatorContext";
import BackButton from "../Common/BackButton";

export default function ResultsPage() {

    return (
        <ResultsContextProvider>
            <BackButton />
            <ResultSelector />
            <ResultsDataView />
        </ResultsContextProvider>
    )
}
import {PropsWithChildren} from "react";
import {CircularProgress} from "@mui/joy";

interface Props {
    isLoading: boolean
}

export default function LoadingManager(props: PropsWithChildren<Props>) {
    const {isLoading, children} = props
    return (
        <>
            {isLoading ? <CircularProgress /> : children}
        </>
    )
}
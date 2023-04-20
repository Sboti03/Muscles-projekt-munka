import {PropsWithChildren} from "react";
import {CircularProgress} from "@mui/joy";
import {OverridableStringUnion} from "@mui/types";
import {CircularProgressPropsSizeOverrides} from "@mui/joy/CircularProgress/CircularProgressProps";

interface Props {
    isLoading: boolean,
    fullCenter?: boolean
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', CircularProgressPropsSizeOverrides>
}

export default function LoadingManager(props: PropsWithChildren<Props>) {
    const {isLoading, children, fullCenter, size} = props
    if (fullCenter) {
        return (
            <div className={`${isLoading ? "full-height full-center" : ""}`}>
                {isLoading ? <CircularProgress size={size ? size : 'lg'} /> : children}
            </div>
        )
    } else {
        return (
            <>
                {isLoading ? <CircularProgress size={size ? size : 'lg'} /> : children}
            </>
        )
    }
}
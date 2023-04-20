import {useContext} from "react";
import NavigatorContext from "../Navigator/NavigatorContext";
import {Button} from "@mui/joy";

export default function BackButton() {
    const {setPrevPage} = useContext(NavigatorContext)
    return (
        <Button onClick={setPrevPage}>Back</Button>
    )
}
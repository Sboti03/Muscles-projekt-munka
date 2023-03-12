import {Methods, singleFetch} from "../../utils/Fetch";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useContext} from "react";
import AuthContext from "../AuthContext";

export default async function newAccessToken() {

    const {error, response} = await singleFetch<any>('/api/auth/access', Methods.GET)
    if (error) {
        return {
            error: error,
            response: undefined
        }
    } else {
        if (response) {
            return {
                response: response,
                error: undefined
            }
        }
    }
}

enum TokenType {
    REFRESH,
    ACCESS
}
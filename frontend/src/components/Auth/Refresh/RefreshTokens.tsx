import {Methods, singleFetch} from "../../utils/Fetch";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default async function newAccessToken() {
    const {error, response} = await singleFetch('/api/auth/access', Methods.GET)
    if (error) {
        return error
    } else {
        if (response) {
            return response
        }
    }
}

enum TokenType {
    REFRESH,
    ACCESS
}
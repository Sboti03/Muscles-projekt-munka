import axios from "axios";
import {BASE_URL} from "@env";

const newAccessTokenApi = BASE_URL + 'api/auth/access'

export default async function newRefreshToken() {
    axios.get(newAccessTokenApi)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        })
}
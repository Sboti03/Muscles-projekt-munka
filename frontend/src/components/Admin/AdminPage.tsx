import useFetch, {Methods} from "../utils/Fetch";
import {User} from "../Types/User";
import {useContext, useEffect} from "react";
import newAccessToken from "../Auth/Refresh/RefreshTokens";
import AuthContext from "../Auth/AuthContext";

export default function AdminPage() {

    const {isLoading, response, error} = useFetch<Array<AdminRes>>('/api/user/all', Methods.GET)
    const {setIsAccessTokenExpired} = useContext(AuthContext)
    useEffect(()=> {
        if (error) {
            if (error.statusCode === 401) {
                setIsAccessTokenExpired(true)
            }
        }
    }, [error])

    return (
        <>
            {isLoading && 'loadiiing'}
            {error && error.message}
            {
                response &&
                <table>
                    <thead>
                    <th><td>Id</td></th>
                    <th><td>Email</td></th>
                    <th><td>Token</td></th>
                    <th><td>Role</td></th>
                    </thead>
                    <tbody>
                    {
                        response.map(data =>
                            <tr key={data.userId}>
                                <td>{data.userId}</td>
                                <td>{data.email}</td>
                                <td>{data.refreshTokens.length}</td>
                                <td>{data.roles.roleName}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            }
        </>
    )
}


interface AdminRes extends User {
    password: string;
    refreshTokens: string[];
}

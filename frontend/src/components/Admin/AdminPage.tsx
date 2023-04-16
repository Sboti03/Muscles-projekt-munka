import useFetch, {Methods, singleFetch} from "../utils/Fetch";
import {User} from "../Types/User";
import {useContext, useEffect, useMemo} from "react";
import newAccessToken from "../Auth/Refresh/RefreshTokens";
import AuthContext from "../Auth/AuthContext";
import {Button} from "@mui/joy";
import {da} from "date-fns/locale";
import {toast} from "react-toastify";

export default function AdminPage() {
    const {isLoading, response, error} = useFetch<Array<AdminRes>>('/api/admin/user/all', Methods.GET)

    useEffect(()=> {
        if (error) {
            if (error.statusCode === 401) {

            }
        }
    }, [error])

    async function blockUser(userId: number) {
        const result = await singleFetch('api/admin/user/unblock/' + userId, Methods.PATCH)
        if (result.error) {
            toast.error(result.error.message)
        } else {
            toast.info("Done")
        }
    }

    return (
        <>
            {isLoading && 'loadiiing'}
            {
                response &&
                <table>
                    <thead>
                    <th><td>Id</td></th>
                    <th><td>Email</td></th>
                    <th><td>Token</td></th>
                    <th><td>Role</td></th>
                    <th><td>Is blocked</td></th>
                    </thead>
                    <tbody>
                    {
                        response.map(data =>
                            <>
                                <tr key={data.userId}>
                                    <td>{data.userId}</td>
                                    <td>{data.email}</td>
                                    <td>{data.refreshTokens.length}</td>
                                    <td>{data.role.roleName}</td>
                                    <td>{data.isBlocked}</td>
                                </tr>
                                <Button color="danger" onClick={()=> blockUser(data.userId)} >Block</Button>
                            </>
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
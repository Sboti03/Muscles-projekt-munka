import useFetch, {Methods} from "../utils/Fetch";
import {User} from "../Types/User";
import {useEffect, useState} from "react";
import {Roles} from "../Types/Roles";

export default function AdminPage() {

    const {isLoading, response, error} = useFetch<Array<AdminRes>>('/api/user/all', Methods.GET)


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

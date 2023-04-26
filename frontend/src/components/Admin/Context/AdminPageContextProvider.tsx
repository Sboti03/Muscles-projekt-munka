import React, {PropsWithChildren, useEffect} from "react";
import {AdminPageContext} from "./AdminPageContext";
import {Methods, singleFetch} from "../../utils/Fetch";
import {toast} from "react-toastify";
import {ProfileUserRoleResponse} from "../AdminPage";

export default function AdminPageContextProvider(props: PropsWithChildren) {
    const [users, setUsers] = React.useState<ProfileUserRoleResponse[]>([])


    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const result = await singleFetch<ProfileUserRoleResponse[]>('/api/admin/profile/all', Methods.GET)
        if (result.response) {
            setUsers(result.response)
        }
    }

    async function blockUser(userId: number) {
        const result = await singleFetch('api/admin/user/block/' + userId, Methods.DELETE)
        if (result.error) {
            toast.error(result.error.message)
        } else {
            toast.info("Done")
        }
        fetchUsers()
    }

    async function unBlock(userId: number) {
        const result = await singleFetch('api/admin/user/unblock/' + userId, Methods.PATCH)
        if (result.error) {
            toast.error(result.error.message)
        } else {
            toast.info("Done")
        }
        fetchUsers()
    }
    return (
        <AdminPageContext.Provider value={{
            blockUser,
            unBlock,
            users,
            fetchUsers,
        }}>{props.children}</AdminPageContext.Provider>
    )
}
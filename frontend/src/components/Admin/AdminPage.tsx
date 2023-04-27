import {Methods, singleFetch} from "../utils/Fetch";
import {User} from "../Types/User";
import React, {useContext, useEffect} from "react";
import {Button, Table} from "@mui/joy";
import {toast} from "react-toastify";
import {TableBody, TableHead} from "@mui/material";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import {AdminPageContext} from "./Context/AdminPageContext";
import Profile from "./Profile/Profile";
import authContext from "../Auth/AuthContext";

interface AdminRes extends User {
    password: string;
    refreshTokens: string[];
}

export default function AdminPage() {
    const {users} = useContext(AdminPageContext)
    const {logout} = useContext(authContext)
    return (
        <>
            {
                <Table sx={{textAlign: 'center'}}>
                    <TableHead>
                        <tr>
                            <th style={{textAlign: "center"}}>Id</th>
                            <th style={{textAlign: "center"}} className="text-center">Profile</th>
                            <th style={{textAlign: "center"}}>Name</th>
                            <th style={{textAlign: "center"}}>Age</th>
                            <th style={{textAlign: "center"}}>Email</th>
                            <th style={{textAlign: "center"}}>Token</th>
                            <th style={{textAlign: "center"}}>Role</th>
                            <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {
                            users && users.length > 0 &&
                            users.map(data =>
                                <Profile data={data} key={data.userId}/>
                            )
                        }
                    </TableBody>
                </Table>
            }
            <div>
                <Button color={"danger"} onClick={logout}>Log out</Button>
            </div>
        </>
    )
}



interface user {
    changedAt: Date
    email: string
    isBlocked: boolean
    password: string;
    roleId: number;
    userId: number;
    refreshTokens: string[];
    role: role
    isDeleted: boolean
}

interface role {
    changedAt: Date;
    roleId: number;
    roleName: string;
}

export interface ProfileUserRoleResponse {
    birthDay: Date | null;
    changedAt: Date;
    firstName: string;
    height: number | null;
    lastName: string | null;
    male: boolean;
    profileId: number;
    profilePicPath: string;
    registrationDate: Date
    userId: number;
    user: user

}


import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import {Button} from "@mui/joy";
import React, {useEffect} from "react";
import {ProfileUserRoleResponse} from "../AdminPage";
import {AdminPageContext} from "../Context/AdminPageContext";
import {getAge} from "../../UserCoach/UserProfileDataView/UserProfileDataView";

export default function Profile(props: {data: ProfileUserRoleResponse}) {
    const {blockUser, unBlock, deleteUser} = React.useContext(AdminPageContext)
    const {user, changedAt, profileId, profilePicPath, height,birthDay,male,userId, registrationDate, lastName, firstName} = props.data
    useEffect(()=> {
        console.log(props.data, 'asd')
    }, [])

    return (
        <tr>
            <td>{userId}</td>
            <td className="">
                <ProfilePicture size={70} clickable={false} profileId={userId}/>
            </td>
            <td>{firstName ? firstName : '-'} {lastName ? lastName : '-'}</td>
            <td>{birthDay ? getAge(new Date(birthDay)) : '-' }</td>
            <td>{user.email}</td>
            <td>{user.refreshTokens.length}</td>
            <td>{user.role.roleName}</td>
            <td>
                <div className="flex gap-2">
                    {!user.isBlocked && !user.isDeleted &&
                        <Button color="danger"
                                onClick={() => blockUser(user.userId)}>Block</Button>
                    }
                    {user.isBlocked && !user.isDeleted &&
                        <Button onClick={() => unBlock(user.userId)}>un block</Button>
                    }
                    { !user.isDeleted &&
                        <Button onClick={()=> deleteUser(user.email)}>Delete</Button>
                    }
                    {
                        user.isDeleted && "DELETED"
                    }
                </div>
            </td>
        </tr>
    )
}
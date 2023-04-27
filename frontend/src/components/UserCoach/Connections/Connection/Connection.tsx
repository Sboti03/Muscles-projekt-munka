import {ConnectionResponse} from "../../data/ConnectionResponse";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../Auth/AuthContext";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import {convertResponseToData, ProfileData, ProfileResponse} from "../../data/SearchResponse";
import {Methods, singleFetch} from "../../../utils/Fetch";
import styles from '../ConnectionRequest/ConnectionRequest.module.css'
import LoadingManager from "../../../Loading/LoadingManager";
import {RoleEnum} from "../../../Types/Role";
import UserCoachNavigatorContext, {UserCoachPages} from "../../navigator/UserCoachNavigatorContext";
import UserCoachContext from "../../context/UserCoachContext";
import {Button} from "@mui/joy";
import ConnectionContext from "../../../connection/ConnectionContext";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";

export default function Connection(props: { connection: ConnectionResponse }) {
    const {userId, coachId} = props.connection
    const {user} = useContext(AuthContext)
    const {changePage} = useContext(UserCoachNavigatorContext)
    const {deleteConnection} = useContext(ConnectionContext)
    const {setShowProfileId, refresh} = useContext(UserCoachContext)
    const otherId = user!.userId === userId ? coachId : userId
    const [profile, setProfile] = useState<ProfileData>()

    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        const profileIdResult = await singleFetch<{ profileId: number }>(`/api/user/profile/${otherId}`, Methods.GET)
        if (profileIdResult.response) {
            const profile = await singleFetch<ProfileResponse>(`/api/profile/search/id/${profileIdResult.response.profileId}`, Methods.GET)
            if (profile.response) {
                const profileData = convertResponseToData(profile.response)
                setProfile(profileData)
            }
        }
    }

    function handleClick() {
        setShowProfileId(profile!.userId)
        if (user!.role.roleName === RoleEnum.USER) {
            changePage(UserCoachPages.PROFILE_VIEW)
        } else {
            changePage(UserCoachPages.COACH_MANAGER)
        }
    }

    async function handleDelete() {
        await deleteConnection(profile!.userId)
        setDialogOpen(false)
        refresh()
    }

    if (!profile) {
        return <LoadingManager isLoading={true}/>
    }


    return (
        <div className={styles.container}>
            <button className={styles.userData} onClick={handleClick}>
                <div className={styles.profilePic}>
                    <ProfilePicture clickable={false} size={75} profileId={profile.userId}/>
                </div>
                <div>{profile.firstName} {profile.lastName}</div>
            </button>
            <Button color="danger" onClick={()=> setDialogOpen(true)}>
                Delete
            </Button>
            <Dialog open={dialogOpen} >
                <DialogTitle>Are you sure you want to delete the connection with {profile.firstName} {profile.lastName}?</DialogTitle>
                <DialogActions>
                    <Button color={"danger"} onClick={handleDelete}>Yes</Button>
                    <Button onClick={()=> setDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
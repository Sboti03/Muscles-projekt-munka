import {ConnectionRequestResponse} from "../../data/ConnectionResponse";
import {Methods, singleFetch} from "../../../utils/Fetch";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../Auth/AuthContext";
import {convertResponseToData, ProfileData, ProfileResponse} from "../../data/SearchResponse";
import LoadingManager from "../../../Loading/LoadingManager";
import styles from './ConnectionRequest.module.css'
import {Button} from "@mui/joy";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import UserCoachContext from "../../context/UserCoachContext";
import UserCoachNavigatorContext, {UserCoachPages} from "../../navigator/UserCoachNavigatorContext";
import ConnectionContext from "../../../connection/ConnectionContext";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

export default function ConnectionRequest(props: { connectionRequest: ConnectionRequestResponse }) {
    const {coachId, userId, requestBy} = props.connectionRequest
    const {user} = useContext(AuthContext)
    const ownId = user!.userId
    const isOwnRequest = ownId === requestBy
    const otherUserId = ownId === userId ? coachId : userId
    const {setShowProfileId, refresh} = useContext(UserCoachContext)
    const {changePage} = useContext(UserCoachNavigatorContext)
    const [profile, setProfile] = useState<ProfileData>()
    const {acceptConnectionRequest, deleteConnectionRequest} = useContext(ConnectionContext)
    const {t} = useTranslation()
    const [isHoverActive, setIsHoverActive] = useState(true)


    async function fetchProfile() {
        const profileIdResult = await singleFetch<{ profileId: number }>(`/api/user/profile/${otherUserId}`, Methods.GET)
        if (profileIdResult.response) {
            const profile = await singleFetch<ProfileResponse>(`/api/profile/search/id/${profileIdResult.response.profileId}`, Methods.GET)
            if (profile.response) {
                const profileData = convertResponseToData(profile.response)
                setProfile(profileData)
            }
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])




    function handleLoadProfile() {
        setShowProfileId(otherUserId)
        changePage(UserCoachPages.PROFILE_VIEW)
    }

    async function cancelRequest() {
        const result = await deleteConnectionRequest(otherUserId)
        if (result) {
            refresh()
        } else {
            toast.error(t("connection.error.accept"))
        }
    }


    async function acceptRequest() {
        const result = await acceptConnectionRequest(otherUserId)
        if (result) {
            refresh()
        } else {
            toast.error(t("connection.error.accept"))
        }
    }

    return profile ? (
            <div className={styles.container}>
                <button className={styles.userData} onClick={handleLoadProfile}>
                    <div className={styles.profilePic}>
                        <ProfilePicture clickable={false} size={75} profileId={profile.userId}/>
                    </div>
                    <div>{profile.firstName} {profile.lastName}</div>
                </button>
                {
                    !isOwnRequest &&
                    <Button onMouseOver={() => setIsHoverActive(false)} onClick={acceptRequest} onMouseOut={() => setIsHoverActive(true)}
                            color="success">
                        Accept
                    </Button>
                }
                <Button onMouseOver={() => setIsHoverActive(false)} onClick={cancelRequest}
                        onMouseOut={() => setIsHoverActive(true)} color="danger">
                    {!isOwnRequest ? 'Dennie' : 'Delete'}
                </Button>

            </div>
        ) :
        <LoadingManager isLoading={true}/>
}
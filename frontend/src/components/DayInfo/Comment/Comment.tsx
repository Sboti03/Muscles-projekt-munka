import React, {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../Auth/AuthContext";
import {Methods, singleFetch} from "../../utils/Fetch";
import {RoleEnum} from "../../Types/Role";
import DayInfoContext from "../context/DayInfoContext";
import {normalizeDate} from "../context/DayInfoContextProvider";
import UserCoachContext from "../../UserCoach/context/UserCoachContext";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import ProfileContext from "../../Profile/context/ProfileContext";
import './Comment.css'
import {Textarea} from "@mui/joy";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faRemove} from "@fortawesome/free-solid-svg-icons";

export default function Comment() {
    const {user} = useContext(AuthContext)
    const {currentDate} = useContext(DayInfoContext)
    const {showProfileId, connections, profile} = useContext(UserCoachContext)
    const [commentData, setCommentData] = useState<{comment: string, changedAt: string}>()
    const {profileData} = useContext(ProfileContext)
    const connection = connections.find(value => value.accessAll)
    const [editMode, setEditMode] = useState(false)
    const commentInput = useRef<HTMLInputElement>(null)

    async function fetchComment() {
        let query = '?date=' + normalizeDate(currentDate)
        if (user) {
            if (user.role.roleName === RoleEnum.COACH) {
                query += `&profileId=${showProfileId}`
            }
        }

        const result = await singleFetch<{ comment: string, changedAt: string }>('api/day-history/comment' + query, Methods.GET)

        if (result.response) {
            setCommentData(result.response)
        }
    }

    useEffect(() => {
        fetchComment()
    }, [user, currentDate])


    function handleSend(ownComment?: string) {
        console.log(ownComment)
        singleFetch('api/day-history/comment', Methods.POST, {
            date: normalizeDate(currentDate),
            userId: showProfileId,
            comment: ownComment != undefined ? ownComment : commentData?.comment
        }).then(() => fetchComment());
    }

    function handleEditClick() {
        if (editMode) {
            setEditMode(false)
            handleSend()
        } else {
            setEditMode(true)
            commentInput.current?.focus()
        }
    }

    function changeComment(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter') {
            handleSend()
            setEditMode(false)
        }
    }

    function handleDeleteComment() {
        setCommentData({...commentData!, comment: ''})
        handleSend('')
    }

    function showComment() {
        return <div className="mt-5">
            {
                editMode ? <>
                        <Textarea onKeyDown={changeComment} ref={commentInput} className="bg-gray-200"
                                  onChange={(event) => setCommentData({...commentData!, comment: event.target.value})} value={commentData?.comment}/>
                    </>
                    :
                    <>
                        {commentData?.comment}
                    </>
            }
            <div className="text-sm text-gray-700">
                {new Date(commentData!.changedAt).toUTCString()}
            </div>
            {user?.role.roleName === RoleEnum.COACH &&
                <div className="absolute bottom-1 right-1">
                    <button onClick={handleEditClick} className="comment-edit-btn"><FontAwesomeIcon
                        icon={faEdit}/></button>
                    <button onClick={handleDeleteComment} className="comment-delete-btn"><FontAwesomeIcon icon={faRemove}/>
                    </button>
                </div>
            }
        </div>;
    }

    function showWriteSomeThing() {
        return (
            <div className="mt-5">
                <Textarea placeholder="Write something..." onKeyDown={changeComment} ref={commentInput} className="bg-gray-200"
                          onChange={(event) => setCommentData({...commentData!, comment: event.target.value})} value={commentData?.comment}/>
            </div>
        )
    }

    if (!commentData || !connections || !user) {
        return (
            <></>
        )
    }



    return (
        <div className="flex justify-center">
            <div className="bg-gray-200 w-96 my-5 p-2 flex rounded-xl shadow shadow-gray-300 edit-text-box relative">
                <div className="flex m-1">
                    <ProfilePicture size={50} clickable={false}
                                    profileId={connection ? connection.coachId : undefined}/>
                </div>
                <div className="mt-2">
                    <div className="">
                        {profile ? <>
                                {profile.firstName} {profile.lastName}
                            </> :
                            <>
                                {profileData.firstName} {profileData.lastName}
                            </>
                        }
                    </div>
                    {
                        commentData?.comment !== '' ? showComment() : user?.role.roleName === RoleEnum.COACH && showWriteSomeThing()
                    }
                </div>
            </div>
        </div>
    )
}
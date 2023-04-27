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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faRemove} from "@fortawesome/free-solid-svg-icons";
import {TextField} from "@mui/material";

export default function Comment() {
    const {user} = useContext(AuthContext)
    const {currentDate} = useContext(DayInfoContext)
    const {showProfileId, connections, profile} = useContext(UserCoachContext)
    const [commentData, setCommentData] = useState<{comment: string, changedAt: string}>()
    const {profileData} = useContext(ProfileContext)
    const connection = connections.find(value => value.accessAll)

    const [editMode, setEditMode] = useState(false)
    const commentInput = useRef<HTMLTextAreaElement>(null)
    const isCommentExist = commentData ?  commentData.comment !==  '' : false;
    const [comment, setComment] = useState('')
    const [renderedComment, setRenderedComment] = useState(<></>)

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
            setComment(result.response.comment)
        }
    }

    useEffect(() => {
        if (user) {
            fetchComment()
        }
    }, [user, currentDate])


    const textAreaEdit = <textarea placeholder="Write something..." onKeyDown={changeComment} value={comment} onChange={e=> setComment(e.target.value)} ref={commentInput} className="bg-white rounded-xl p-2"/>

    function handleSend(ownComment?: string) {
        console.log(commentInput.current)
        const commentToSend = ownComment != undefined ? ownComment : comment
        singleFetch('api/day-history/comment', Methods.POST, {
            date: normalizeDate(currentDate),
            userId: showProfileId,
            comment: commentToSend
        }).then(() => fetchComment());
    }

    function handleEditClick() {
        console.log(editMode)
        if (!editMode) {
            if (commentInput.current && commentData && commentData.comment !== commentInput.current.value) {
                handleSend()
            }
        } else {
            if (commentInput?.current) {
                commentInput.current.focus()
            }

        }
    }

    useEffect(()=> {
        handleEditClick()
    }, [editMode])


    function changeComment(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        console.log(event.key)
        if (event.key === 'Enter' || event.key === 'enter' && editMode) {
            console.log('Seed')
            setEditMode(false)
            handleSend()
        }
    }

    function handleDeleteComment() {
        setCommentData({...commentData!, comment: ''})
        setComment('')
        handleSend('')
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
                    <>
                        {commentData.comment !== '' && !editMode ?
                        <>
                            {comment}
                            <div className="text-sm text-gray-700">
                                {new Date(commentData!.changedAt).toUTCString()}
                            </div>
                            {user?.role.roleName === RoleEnum.COACH &&
                                <div className="absolute bottom-1 right-1">
                                    <button onClick={()=> setEditMode(prevState => !prevState)} className="comment-edit-btn"><FontAwesomeIcon
                                        icon={faEdit}/></button>
                                    <button onClick={handleDeleteComment} className="comment-delete-btn"><FontAwesomeIcon icon={faRemove}/>
                                    </button>
                                </div>
                            }
                        </>
                        :
                         <>
                             <div className="mt-5">
                                 {textAreaEdit}
                             </div>
                         </>
                        }
                    </>
                </div>
            </div>
        </div>
    )
}


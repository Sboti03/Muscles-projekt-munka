import {SearchResponse} from "../data/SearchResponse";
import styles from './UserView.module.css'
import ProfilePicture from "../../ProfilePicture/ProfilePicture";

interface Props {
    user: SearchResponse,
    isConnected: boolean,
    clickAction: (profileId: number)=> void
}

export default function UserView(props: Props) {
    const {user, isConnected, clickAction} = props



    return (
        <>
            <button onClick={()=> clickAction(user.profileId)} className={styles.userBtn}>
                <div>
                    <ProfilePicture clickable={false} profileId={user.userId} size={50}/>
                </div>
                <div>
                    {user.firstName}
                </div>
                <div>
                    {user.lastName}
                </div>
            </button>
        </>
    )
}
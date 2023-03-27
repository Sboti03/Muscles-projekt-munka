import ProfileDataView from "../ProfileDataView/ProfileDataView";
import styles from './ProfileDataViewPage.module.css'

export default function ProfileViewPage() {
    return (
        <div className={styles.container}>
            <ProfileDataView backBtn={"Back"} saveBtn={"Save"} saveBtnAction={undefined} />
        </div>
    )
}
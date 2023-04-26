import ProfileBar from "../ProfileBar/ProfileBar";
import UserCoachPage from "../UserCoach/UserCoachPage";

export function CoachHomePage() {


    return (
        <div>

            <div className="absolute top-0 right-0">
                <ProfileBar coachMode={true}/>
            </div>
            <UserCoachPage />

        </div>
    )
}
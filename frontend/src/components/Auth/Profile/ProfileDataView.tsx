import useFetch, {Methods} from "../../utils/Fetch";
import {CircularProgress, Input} from "@mui/joy";
import {ProfileResponse} from "./data/ProfileResponse";
import {normalizeDate} from "../../DayInfo/DayInfoContextProvider";

export default function ProfileDataView() {
    const {isLoading, response, error} = useFetch<ProfileResponse>('api/profile', Methods.GET)


    return (
        <>
            {isLoading && <CircularProgress />}
            <div>
                <form>
                    <div>
                        <Input type="text" name="firstName" value={response?.fistName} placeholder="First name"/>
                    </div>
                    <div>
                        <Input type="text" name="lastName" value={response?.lastName} placeholder="Last name"/>
                    </div>
                    <div>
                        <Input type="number" name="height" value={response?.height} placeholder="Height in cm"/>
                    </div>
                    <div>
                        <Input type="text" name="birthDay" value={response?.birthDay?.toISOString()} placeholder="Birth day"/>
                    </div>
                    <div>
                        <Input contentEditable={false} value={response?.registrationDate} />
                    </div>
                </form>
            </div>
        </>
    )
}
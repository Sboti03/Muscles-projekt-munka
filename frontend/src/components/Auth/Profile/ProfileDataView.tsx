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
                        <Input type="text" name="firstName" value={response?.fistName} disabled/>
                    </div>
                    <div>
                        <Input type="text" name="firstName" value={response?.lastName} disabled/>
                    </div>
                    <div>
                        <Input type="text" name="firstName" value={response?.height} disabled/>
                    </div>
                    <div>
                        <Input type="text" name="firstName" value={response?.birthDay?.toISOString()} disabled/>
                    </div>
                    <div>
                        {normalizeDate(response!.registrationDate)}
                    </div>
                </form>
            </div>
        </>
    )
}
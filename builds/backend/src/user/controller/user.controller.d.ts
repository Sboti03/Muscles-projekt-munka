import { UserGetService } from "../services/user-get/user-get.service";
import { IdParam } from "../../Common/params/id.param";
import { ProfileGetService } from "../../profile/services/profile-get/profile-get.service";
import { UserCheckService } from "../services/user-check/user-check.service";
export declare class UserController {
    private userGetService;
    private profileGetService;
    private userCheckService;
    constructor(userGetService: UserGetService, profileGetService: ProfileGetService, userCheckService: UserCheckService);
    getProfileByUserId(idParam: IdParam): Promise<{
        profileId: number;
    }>;
}

import { IdParam } from "../../../Common/params/id.param";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
import { profileData } from "@prisma/client";
export declare class AdminProfileController {
    private profileGetService;
    constructor(profileGetService: ProfileGetService);
    getAllProfileDataById(idParam: IdParam): Promise<profileData>;
    getAllProfile(): Promise<(profileData & {
        user: import(".prisma/client").users & {
            role: import(".prisma/client").roles;
        };
    })[]>;
}

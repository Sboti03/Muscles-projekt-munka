import { IdParam } from "../../../Common/params/id.param";
import { ProfileGetService } from "../../../profile/services/profile-get/profile-get.service";
export declare class AdminProfileController {
    private profileGetService;
    constructor(profileGetService: ProfileGetService);
    getAllProfileAdminVersion(): Promise<import(".prisma/client").profileData[]>;
    getAllProfileDataById(idParam: IdParam): Promise<import(".prisma/client").profileData>;
    getAllProfile(): Promise<import(".prisma/client").profileData[]>;
}

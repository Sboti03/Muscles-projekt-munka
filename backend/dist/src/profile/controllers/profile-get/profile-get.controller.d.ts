import { ProfileGetService } from "../../services/profile-get/profile-get.service";
import { IdParam } from "../../../Common/params/id.param";
export declare class ProfileGetController {
    private profileGetService;
    constructor(profileGetService: ProfileGetService);
    getProfileData(profileId: number): Promise<import(".prisma/client").profileData>;
    getProfileByName(name: string, role: string, profileId: number): Promise<{
        profileId: number;
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
        userId: number;
        firstName: string;
        lastName: string;
        male: boolean;
    }[]>;
    getProfileDataById(idParam: IdParam): Promise<{
        userId: number;
        registrationDate: Date;
        firstName: string;
        birthDay: Date;
        lastName: string;
        height: number;
        male: boolean;
    }>;
}

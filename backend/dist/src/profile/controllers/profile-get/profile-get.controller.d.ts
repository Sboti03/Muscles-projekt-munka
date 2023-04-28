import { ProfileGetService } from "../../services/profile-get/profile-get.service";
import { IdParam } from "../../../Common/params/id.param";
export declare class ProfileGetController {
    private profileGetService;
    constructor(profileGetService: ProfileGetService);
    getAllProfileAdminVersion(): Promise<import(".prisma/client").profileData[]>;
    getAllProfileDataById(idParam: IdParam): Promise<import(".prisma/client").profileData>;
    getProfileData(profileId: number): Promise<import(".prisma/client").profileData>;
    getAllProfile(): Promise<import(".prisma/client").profileData[]>;
    getProfileByName(name: string, role: string): Promise<{
        userId: number;
        firstName: string;
        lastName: string;
        user: {
            email: string;
            role: {
                roleName: string;
            };
        };
    }[]>;
    getProfileDataById(idParam: IdParam): Promise<{
        userId: number;
        registrationDate: Date;
        firstName: string;
        birthDay: Date;
        lastName: string;
        height: number;
    }>;
}

import { ProfileCreateService } from "../../services/profile-create/profile-create.service";
import ProfileUpdateDto from "../../dto/profile-update.dto";
import { ProfileUpdateService } from "../../services/profile-update/profile-update.service";
import { ProfileConvertService } from "../../services/profile-convert/profile-convert.service";
export declare class ProfileUpdateController {
    private readonly profileCreateService;
    private profileUpdateService;
    private profileConvertService;
    constructor(profileCreateService: ProfileCreateService, profileUpdateService: ProfileUpdateService, profileConvertService: ProfileConvertService);
    updateProfile(profileId: number, profileUpdateDto: ProfileUpdateDto): Promise<import(".prisma/client").profileData>;
}

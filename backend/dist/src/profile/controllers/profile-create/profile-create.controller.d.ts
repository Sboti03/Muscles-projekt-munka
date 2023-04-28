import { ProfileCreateService } from "../../services/profile-create/profile-create.service";
import ProfileCreateDto from "../../dto/profile-create.dto";
import { ProfileUpdateService } from "../../services/profile-update/profile-update.service";
import { ProfileConvertService } from "../../services/profile-convert/profile-convert.service";
import { AuthTokenService } from "../../../auth/services/auth-token/auth-token.service";
export declare class ProfileCreateController {
    private readonly profileCreateService;
    private profileUpdateService;
    private profileConvertService;
    private authTokenService;
    constructor(profileCreateService: ProfileCreateService, profileUpdateService: ProfileUpdateService, profileConvertService: ProfileConvertService, authTokenService: AuthTokenService);
    createProfile(userId: number, profileCreateDto: ProfileCreateDto): Promise<{
        profile: import(".prisma/client").profileData;
        tokens: import("../../../auth/types/token").Tokens;
    }>;
}

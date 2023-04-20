import { PrismaService } from "../Common/utils/prirsma.service";
import { ProfileGetService } from "../profile/services/profile-get/profile-get.service";
export declare class ImageService {
    private prismaService;
    private profileGetService;
    constructor(prismaService: PrismaService, profileGetService: ProfileGetService);
    setProfilePicturePath(profileId: number, filename: string): import(".prisma/client").Prisma.Prisma__profileDataClient<import(".prisma/client").profileData, never>;
    getProfilePictureById(profileId: number): Promise<string>;
    getDefaultProfilePicture(profileId: number): Promise<string>;
    deleteProfilePicture(profileId: number, fileName: string): void;
    setDefaultProfilePicture(profileId: number): Promise<import(".prisma/client").profileData>;
}

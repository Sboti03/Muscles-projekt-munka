/// <reference types="multer" />
import { ProfileUpdateService } from "../profile-update/profile-update.service";
import { ProfileCheckService } from "../profile-check/profile-check.service";
import { ImageService } from "../../../Image/image.service";
export declare class ProfileImageService {
    private profileUpdateService;
    private profileCheckService;
    private imageService;
    constructor(profileUpdateService: ProfileUpdateService, profileCheckService: ProfileCheckService, imageService: ImageService);
    uploadProfileImage(profileId: number, file: Express.Multer.File): Promise<import(".prisma/client").profileData>;
    deleteProfilePic(profileId: number): Promise<{}>;
    getProfilePicturePathByProfileId(profileId: number): Promise<string>;
}

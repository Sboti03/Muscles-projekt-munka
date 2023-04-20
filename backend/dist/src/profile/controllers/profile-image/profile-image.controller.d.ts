/// <reference types="multer" />
import { Response } from "express";
import { IdParam } from "../../../Common/params/id.param";
import { ProfileImageService } from "../../services/profile-image/profile-image.service";
export declare class ProfileImageController {
    private profileImageService;
    constructor(profileImageService: ProfileImageService);
    uploadProfilePic(profileId: number, file: Express.Multer.File): Promise<import(".prisma/client").profileData>;
    deleteProfilePic(profileId: number): Promise<{}>;
    getOwnProfilePicture(profileId: number, res: Response): Promise<void>;
    getProfilePicById(idParam: IdParam, res: Response): Promise<void>;
}

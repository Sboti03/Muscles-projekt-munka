import { BadRequestException, Injectable, Logger, NotFoundException, Param, Res } from "@nestjs/common";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import { ProfileCreateService } from "../profile-create/profile-create.service";
import { ProfileUpdateService } from "../profile-update/profile-update.service";
import { ProfileConvertService } from "../profile-convert/profile-convert.service";
import { ProfileCheckService } from "../profile-check/profile-check.service";
import { ImageService } from "../../../Image/image.service";
import { GetCurrentUserProfileId } from "../../../auth/decorators/decorators";
import { IdParam } from "../../../Common/params/id.param";
import { Response } from "express";
import { join } from "path";

@Injectable()
export class ProfileImageService {
    constructor(private profileUpdateService: ProfileUpdateService,
                private profileCheckService: ProfileCheckService,
                private imageService:ImageService) {
    }


    async uploadProfileImage(profileId: number, file: Express.Multer.File) {
        Logger.debug(`Uploading image profileId ${profileId} fileName: ${file?.filename}`)
        const fileName = file?.filename
        if (!fileName) {
            throw new BadRequestException('File must be a png, jpg/jpeg')
        }
        const oldProfilePic = await this.imageService.getProfilePictureById(profileId)
        if (oldProfilePic) {
            Logger.debug(`Old picture filename: ${oldProfilePic}`)
            await this.imageService.deleteProfilePicture(profileId, oldProfilePic)
        }
        return this.imageService.setProfilePicturePath(profileId, file.filename)
    }


    async deleteProfilePic(profileId: number) {
        const oldProfilePic = await this.imageService.getProfilePictureById(profileId)
        if (!oldProfilePic) {
            throw new NotFoundException('No profile picture found')
        }
        await this.imageService.setDefaultProfilePicture(profileId)
        await this.imageService.deleteProfilePicture(profileId, oldProfilePic)
        return {}
    }

    async getProfilePicturePathByProfileId(profileId: number) {
        const isProfileExist = await this.profileCheckService.checkProfileByProfileId(profileId)
        Logger.log('Profile exists: ' + isProfileExist)
        if (!isProfileExist) {
            throw new NotFoundException('No profile found')
        }
        let profilePicturePath = await this.imageService.getProfilePictureById(profileId)
        Logger.log(profilePicturePath)
        if (profilePicturePath === '') {
            Logger.log(`No profile picture`)
            profilePicturePath = await this.imageService.getDefaultProfilePicture(profileId)
        }
        return join(process.cwd()) + '/images/' + profilePicturePath
    }



}

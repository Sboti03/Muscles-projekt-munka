import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../Common/utils/prirsma.service";
import * as fs from "fs";
import * as path from "path";
import { ProfileGetService } from "../profile/services/profile-get/profile-get.service";


@Injectable()
export class ImageService {

    constructor(private prismaService:PrismaService,
                private profileGetService: ProfileGetService) {
    }

    setProfilePicturePath(profileId: number, filename: string) {
        return this.prismaService.profileData.update({
            where: {profileId},
            data: {profilePicPath: filename}
        })
    }

   async getProfilePictureById(profileId: number) {
        return (await this.prismaService.profileData.findUnique({
            where: {profileId},
            select: {profilePicPath: true}
        })).profilePicPath
    }

    async getDefaultProfilePicture(profileId: number) {
        const {male} = await this.profileGetService.getProfileDataByProfileId(profileId)
        if (male) {
            return `${process.env.MALE_PIC_PATH}`
        }
        return `${process.env.FEMALE_PIC_PATH}`
    }

    deleteProfilePicture(profileId: number, fileName: string) {
        try {
            Logger.log(`[FS DELETE] ${fileName}`)
            fs.unlinkSync(`images/${fileName}`)
        } catch (e) {
            throw new Error("")
        }
    }

    async setDefaultProfilePicture(profileId: number) {
        return this.prismaService.profileData.update({
            where: { profileId },
            data: {
                profilePicPath: ''
            }
        })
    }
}
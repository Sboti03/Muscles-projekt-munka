import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export class ProfileUpdateService {
    constructor(private readonly prismaService: PrismaService) {}


    updateProfile(profileId: number, newProfileData: Prisma.profileDataUpdateInput) {
        return this.prismaService.profileData.update({
            where: {profileId: profileId},
            data: newProfileData
        })
    }

}

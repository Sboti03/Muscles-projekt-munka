import {Injectable} from '@nestjs/common';
import ProfileUpdateDto from "../../dto/profile-update.dto";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../../../Common/utils/prirsma.service";
import ProfileCreateDto from "../../dto/profile-create.dto";

@Injectable()
export class ProfileGetService {

    constructor(private prismaService: PrismaService) {}

    getProfileIdByUserId(userId: number) {
        return this.prismaService.profileData.findFirstOrThrow({
            select: {
              profileId: true
            },
            where: {
                userId
            }
        })
    }

    getAllProfileDataByProfileId(profileId: number) {
        return this.prismaService.profileData.findFirstOrThrow({
            where: {
                profileId
            }
        })
    }

    getAllProfileAllData() {
        return this.prismaService.profileData.findMany({})
    }

    getAllProfile() {
        return this.prismaService.profileData.findMany({
            select:{
                profileId: true,
                userId: true,
                firstName: true,
                lastName: true
            }
        })
    }

    getProfileDataByProfileId(profileId: number) {
        return this.prismaService.profileData.findUniqueOrThrow({
            where: {profileId},
            select: {
                firstName: true,
                lastName: true,
                birthDay: true,
                height: true,
                registrationDate: true,
                userId: true
            }
        })
    }



}

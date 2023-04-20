import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class ProfileCheckService {
    constructor(private prismaService:PrismaService) {
    }

    async checkExistingProfileByUserId(userId: number) {
        try {
            await this.prismaService.profileData.findUniqueOrThrow({
                where: {
                    userId
                }
            })
            return true
        }catch (e) {
            return false
        }
    }


    async checkProfileByProfileId(profileId: number) {
        try {
            await this.prismaService.profileData.findUniqueOrThrow({
                where: {profileId}
            })
            return true
        } catch (e) {
            return false
        }
    }
}

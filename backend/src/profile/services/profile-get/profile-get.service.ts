import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";

@Injectable()
export class ProfileGetService {

    constructor(private prismaService: PrismaService) {
    }

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
            select: {
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


    getUserProfiles(name: string) {
        return this.getProfileByName(name, RoleEnum.USER)
    }

    getCoachProfiles(name: string) {
        return this.getProfileByName(name, RoleEnum.COACH)
    }

    getAdminProfiles(name: string) {
        return this.getProfileByName(name, RoleEnum.ADMIN)
    }

    getProfileByName(name: string, role?: RoleEnum) {
        return this.prismaService.profileData.findMany({
            where: {
                user: {
                    role: {
                        roleName: role
                    }
                },
                OR: [
                    {
                        firstName: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lastName: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: {
                firstName: true,
                lastName: true,
                userId: true,
                user: {
                    select: {
                        email: true,
                        role: {
                            select: {
                                roleName: true
                            }
                        }
                    }
                }
            }
        });
    }
}

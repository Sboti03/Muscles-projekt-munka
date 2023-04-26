import {Injectable, Logger} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import loader from "ts-loader";

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
        return this.prismaService.profileData.findMany({
            include: {
                user: {
                    include: {
                        role: true
                    }
                }
            }
        })
    }

    getAllProfile() {
        return this.prismaService.profileData.findMany({
            select: {
                profileId: true,
                userId: true,
                firstName: true,
                lastName: true,
                male: true
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
                userId: true,
                male: true
            }
        })
    }

    getAllProfilesByName(name: string) {
        return this.getProfilesByName(name)
    }

    async getProfiles(name: string, role: RoleEnum, profileId: number) {
        const result = await this.getProfilesByName(name, role, profileId)
        Logger.log(result)
        return result
    }

    getProfilesByName(name: string, role?: RoleEnum, profileId?: number) {
        Logger.log(name)
        Logger.log(role)
        return this.prismaService.profileData.findMany({
            where: {
                NOT: {
                    profileId
                },
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
                profileId: true,
                firstName: true,
                lastName: true,
                userId: true,
                male: true,
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

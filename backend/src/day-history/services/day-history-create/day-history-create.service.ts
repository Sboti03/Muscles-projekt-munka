import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";

@Injectable()
export class DayHistoryCreateService {
    constructor(private prismaService: PrismaService) {
    }

    createDayHistory(profileId: number, date: Date) {
        return this.prismaService.dayHistory.create({
            data: {
                profileData: {
                    connect: {
                        profileId: profileId,
                    },
                },
                date: date,
            },
            select: {
                dayId: true,
            }
        });
    }


    async commentDayHistory(userId: number, date: Date, comment: string) {
        const {profileId} = await this.prismaService.profileData.findUnique({
            where: {userId},
            select: {profileId: true}
        })
        return this.prismaService.dayHistory.upsert({
            where: {
                date_profileId: {
                    date,
                    profileId
                },
            },
            create: {
                date,
                profileId,
                comment,
            },
            update: {
                comment
            }
        })
    }
}

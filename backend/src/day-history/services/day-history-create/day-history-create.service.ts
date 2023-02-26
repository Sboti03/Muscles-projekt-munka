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
}

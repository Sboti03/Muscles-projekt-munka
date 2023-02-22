import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../utils/prirsma.service";

@Injectable()
export class DayHistoryService {
    constructor(private prismaService: PrismaService) {
    }

    createDayHistory(profileId: number, date: Date) {
        this.prismaService.dayHistory.create({
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

    getDayIdByDate(searchedDate: Date, profileId: number) {
        return this.prismaService.dayHistory.findFirstOrThrow({
            select: {dayId: true},
            where: {date: searchedDate, profileId: profileId}
        });
    }


}

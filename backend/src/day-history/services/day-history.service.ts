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
        });
    }

    getDayHistoryByDate(searchedDate) {
        return this.prismaService.dayHistory.findMany({where: { date: searchedDate }});
    }

    getDayHistory() {
        return this.prismaService.dayHistory.findMany();
    }

}

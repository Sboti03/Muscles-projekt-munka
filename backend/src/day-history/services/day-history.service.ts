import {Body, Injectable} from '@nestjs/common';
import {GetCurrentUser} from "../../auth/decorators/decorators";
import {DayHistoryCreateDto} from "../day-history-create-dto/DayHistoryCreate.dto";
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


}

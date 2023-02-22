import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";

@Injectable()
export class DayHistoryGetService {
constructor(private prismaService: PrismaService) {
}
    getDayIdByDate(searchedDate: Date, profileId: number) {
        return this.prismaService.dayHistory.findFirstOrThrow({
            select: {dayId: true},
            where: {date: searchedDate, profileId: profileId}
        });
    }


}

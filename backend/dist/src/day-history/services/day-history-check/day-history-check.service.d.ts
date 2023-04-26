import { DayHistoryGetService } from "../day-history-get/day-history-get.service";
import { PrismaService } from "../../../Common/utils/prirsma.service";
export declare class DayHistoryCheckService {
    private prismaService;
    private dayHistoryGetService;
    constructor(prismaService: PrismaService, dayHistoryGetService: DayHistoryGetService);
    checkExistingDayHistory(profileId: number, date: Date): Promise<boolean>;
}

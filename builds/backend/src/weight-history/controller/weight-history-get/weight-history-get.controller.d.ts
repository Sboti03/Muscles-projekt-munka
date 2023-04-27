import { DateParam } from "../../../Common/params/date.param";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
export declare class WeightHistoryGetController {
    private dayHistoryGetService;
    constructor(dayHistoryGetService: DayHistoryGetService);
    getAllWeight(profileId: number): Promise<{
        date: Date;
        weightHistory: {
            weight: number;
        };
    }[]>;
    getWeight(currentDate: DateParam, currentProfileId: any): Promise<{
        weightHistory: {
            weight: number;
        };
    }>;
}

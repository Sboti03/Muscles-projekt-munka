import { PrismaService } from "../../../Common/utils/prirsma.service";
import { DayHistoryCreateService } from "../../../day-history/services/day-history-create/day-history-create.service";
import { WeightHistoryUpdateOrCreateService } from "../../services/weight-history-update-or-create/weight-history-update-or-create.service";
import { DayHistoryGetService } from "../../../day-history/services/day-history-get/day-history-get.service";
import { WeightHistoryDataDto } from "../../dto/WeightHistoryData.dto";
export declare class WeightHistoryController {
    private prismaService;
    private dayHistoryCreateService;
    private weightHistoryUpdateOrCreateService;
    private dayHistoryGetService;
    constructor(prismaService: PrismaService, dayHistoryCreateService: DayHistoryCreateService, weightHistoryUpdateOrCreateService: WeightHistoryUpdateOrCreateService, dayHistoryGetService: DayHistoryGetService);
    createOrUpdate(weightHistoryData: WeightHistoryDataDto, currentProfileId: any): Promise<import(".prisma/client").weightHistory>;
}

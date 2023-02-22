import {Body, Controller, NotFoundException, Post} from '@nestjs/common';
import {PrismaService} from "../../../utils/prirsma.service";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {DayHistoryCreateService} from "../../../day-history/services/day-history-create/day-history-create.service";
import {
    WeightHistoryUpdateOrCreateService
} from "../../services/weight-history-update-or-create/weight-history-update-or-create.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {WeightHistoryDataDto} from "../../dto/WeightHistoryData.dto";

@Controller('weight-history')
export class WeightHistoryController {

    constructor(private prismaService: PrismaService,
                private dayHistoryCreateService: DayHistoryCreateService,
                private weightHistoryUpdateOrCreateService: WeightHistoryUpdateOrCreateService,
                private dayHistoryGetService: DayHistoryGetService) {
    }


    @Post('/update')
    async createOrUpdate(@Body() weightHistoryData: WeightHistoryDataDto, @GetCurrentUserProfileId() currentProfileId) {
        let dayId: number;
        if (currentProfileId !== -1) {
            try {
                dayId = (await this.dayHistoryCreateService.createDayHistory(currentProfileId, weightHistoryData.date)).dayId;
            } catch (e) {
                dayId = (await this.dayHistoryGetService.getDayIdByDate(weightHistoryData.date, currentProfileId)).dayId;
            }
            await this.weightHistoryUpdateOrCreateService.updateOrCreateWeightHistory(weightHistoryData.weight, dayId);
        } else {
            throw new NotFoundException();
        }
    }
}

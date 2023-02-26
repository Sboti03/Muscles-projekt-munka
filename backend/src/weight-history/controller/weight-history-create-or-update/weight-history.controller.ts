import {Body, Controller, NotFoundException, Patch, Post, UseGuards} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import {GetAndCheckProfileId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {DayHistoryCreateService} from "../../../day-history/services/day-history-create/day-history-create.service";
import {
    WeightHistoryUpdateOrCreateService
} from "../../services/weight-history-update-or-create/weight-history-update-or-create.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {WeightHistoryDataDto} from "../../dto/WeightHistoryData.dto";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";


@UseGuards(AccessTokenGuard)
@Controller('weight-history')
export class WeightHistoryController {

    constructor(private prismaService: PrismaService,
                private dayHistoryCreateService: DayHistoryCreateService,
                private weightHistoryUpdateOrCreateService: WeightHistoryUpdateOrCreateService,
                private dayHistoryGetService: DayHistoryGetService) {
    }


    @Patch('/update')
    async createOrUpdate(@Body() weightHistoryData: WeightHistoryDataDto, @GetAndCheckProfileId() currentProfileId) {
        let dayId: number;
        try {
            dayId = (await this.dayHistoryGetService.getDayIdByDate(weightHistoryData.date, currentProfileId)).dayId;
        } catch (e) {
            dayId = (await this.dayHistoryCreateService.createDayHistory(currentProfileId, weightHistoryData.date)).dayId;
        }
        return this.weightHistoryUpdateOrCreateService.updateOrCreateWeightHistory(weightHistoryData.weight, dayId);
    }
}

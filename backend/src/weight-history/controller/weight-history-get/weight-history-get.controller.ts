import {ConflictException, Controller, Get, Param, UseGuards} from '@nestjs/common';
import {GetAndCheckProfileId} from "../../../auth/decorators/decorators";
import {DateParam} from "../../../Common/params/date.param";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";

@UseGuards(AccessTokenGuard)
@Controller('weight-history')
export class WeightHistoryGetController {

    constructor(private dayHistoryGetService:DayHistoryGetService) {
    }

    @Get('/weight/all')
    async getAllWeight(@GetAndCheckProfileId() profileId: number) {
        return this.dayHistoryGetService.getAllWeight(profileId);
    }

    @Get('/weight/:date')
    async getWeight(@Param('date') currentDate: DateParam, @GetAndCheckProfileId() currentProfileId) {
        const day = await this.dayHistoryGetService.getLatestDayId(currentDate.date)
        if (!day) {
            throw new ConflictException('No day found')
        }
        return this.dayHistoryGetService.getWeightByDayId(day.dayId);
    }
}

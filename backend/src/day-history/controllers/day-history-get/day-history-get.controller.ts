import {ConflictException, Controller, Get, Param, UseGuards} from '@nestjs/common';
import {DayHistoryGetService} from "../../services/day-history-get/day-history-get.service";
import {DateParam} from "../../../params/date.param";
import {GetAndCheckProfileId} from "../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";

@UseGuards(AccessTokenGuard)
@Controller('day-history')
export class DayHistoryGetController {
    constructor(private dayHistoryGetService: DayHistoryGetService) {
    }

    @Get('/weight/all')
    async getAllWeight(@GetAndCheckProfileId() profileId: number) {
        return this.dayHistoryGetService.getAllWeight(profileId);
    }

    @Get('/weight/:date')
    async getWeight(@Param() currentDate: DateParam, @GetAndCheckProfileId() currentProfileId) {
        const day = await this.dayHistoryGetService.getLatestDayId(currentDate.date)
        if (!day) {
            throw new ConflictException('No day found')
        }
        return this.dayHistoryGetService.getWeightByDayId(day.dayId);
    }


}

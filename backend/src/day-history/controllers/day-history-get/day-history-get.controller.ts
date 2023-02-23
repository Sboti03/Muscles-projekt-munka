import {Controller, Get, Param} from '@nestjs/common';
import {DayHistoryGetService} from "../../services/day-history-get/day-history-get.service";
import {DateParam} from "../../../params/date.param";
import {GetAndCheckProfileId} from "../../../auth/decorators/decorators";

@Controller('day-history')
export class DayHistoryGetController {
    constructor(private dayHistoryGetService: DayHistoryGetService) {
    }

    @Get('/weight/?:date')
    async getWeightByDayIdOrLatestDayId(@Param('date') currentDate: DateParam, @GetAndCheckProfileId() currentProfileId) {
        let dayId: number;
        try {
            dayId = ((await this.dayHistoryGetService.getDayIdByDate(currentDate.date, currentProfileId)).dayId);
        } catch (e) {
            dayId = (await this.dayHistoryGetService.getLatestDayId()).dayId;
        }
        return this.dayHistoryGetService.getWeightByDayId(dayId);
    }
}

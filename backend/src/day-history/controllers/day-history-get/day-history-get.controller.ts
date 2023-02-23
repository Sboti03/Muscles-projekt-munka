import {Controller, Get, Param} from '@nestjs/common';
import {DayHistoryGetService} from "../../services/day-history-get/day-history-get.service";
import {DateParam} from "../../../params/date.param";
import {GetAndCheckProfileId} from "../../../auth/decorators/decorators";

@Controller()
export class DayHistoryGetController {
    constructor(private dayHistoryGetService: DayHistoryGetService) {
    }

    @Get('/day-history/weight/?:date')
    async getWeightByDayIdOrLatestDayId(@Param('date') Currentdate: DateParam, @GetAndCheckProfileId() currentProfileId) {
        let dayId: number;
        try {
            dayId = ((await this.dayHistoryGetService.getDayIdByDate(Currentdate.date, currentProfileId)).dayId);
        } catch (e) {
            dayId = (await this.dayHistoryGetService.getLatestDayId()).dayId;
        }
        return this.dayHistoryGetService.getWeightByDayId(dayId);

    }
}

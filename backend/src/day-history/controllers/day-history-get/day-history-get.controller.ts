import {Body, ConflictException, Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {DayHistoryGetService} from "../../services/day-history-get/day-history-get.service";
import {DateParam} from "../../../Common/params/date.param";
import {GetAndCheckProfileId, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {DayHistoryCheckService} from "../../services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../../meal-history/services/meal-history-get/meal-history-get.service";
import DeleteMealHistoryDto from "../../../meal-history/dto/deleteMealHistory.dto";
import MealHistoryGetDto from "../../dto/meal-history-get.dto";
import {GoalsGetService} from "../../../goals/services/goals-get/goals-get.service";

@UseGuards(AccessTokenGuard)
@Controller('day-history')
export class DayHistoryGetController {
    constructor(private dayHistoryGetService: DayHistoryGetService,
                private dayHistoryCheckService:DayHistoryCheckService,
                private goalsGetService:GoalsGetService) {
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

    @Get('/meal-history/')
    async getMealHistory(@Query() historyGetDto:MealHistoryGetDto, @GetAndCheckProfileId() currentProfileId) {
        const {date, periodName} = historyGetDto
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(currentProfileId, date)
        if (!isDayHistoryExist) {
            return []
        }
        const {dayId} = await this.dayHistoryGetService.getDayIdByDate(date, currentProfileId)
        return this.dayHistoryGetService.getAllMealHistoryByIds(dayId, periodName)
    }

    @Get('data')
    async getDayHistoryData(@Param() dateParam: DateParam, @GetAndCheckProfileId() currentProfileId) {
        const {date} = dateParam
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(currentProfileId, date)
        const goals = this.goalsGetService.getGoalByProfileId(currentProfileId);
        return {

        }
    }


}

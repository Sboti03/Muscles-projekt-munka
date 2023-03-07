import {Controller, Get, Param, Query} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import {GetAndCheckProfileId} from "../../../auth/decorators/decorators";
import {DateParam} from "../../../Common/params/date.param";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {GoalsGetService} from "../../../goals/services/goals-get/goals-get.service";
import {WeightHistoryGetService} from "../../../weight-history/services/weight-history-get/weight-history-get.service";
@Controller('meal-history-get')
export class MealHistoryGetController {

    constructor(private prismaService:PrismaService,
                private dayHistoryGetService:DayHistoryGetService,
                private dayHistoryCheckService:DayHistoryCheckService,
                private mealHistoryGetService:MealHistoryGetService,
                private goalsGetService:GoalsGetService,
                private weightHistoryGetService:WeightHistoryGetService) {
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
        let dayHistory;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(currentProfileId, date)
        if (!isDayHistoryExist) {
            dayHistory = []
        } else {
            const {dayId} = await this.dayHistoryGetService.getDayIdByDate(date, currentProfileId)
            dayHistory = await this.mealHistoryGetService.getAllMealDataByDayId(dayId)
        }
        const goal = await this.goalsGetService.getGoalByProfileIdAndDate(currentProfileId, date);
        const {weight, day: {date: weightDate}} = await this.weightHistoryGetService.getWeightFromDate(date, currentProfileId)
        return {
            dayHistory: dayHistory,
            goal,
            weight: {weight, weightDate}
        }
    }

}

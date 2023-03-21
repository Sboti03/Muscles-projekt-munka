import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {PrismaService} from "../../../Common/utils/prirsma.service";
import MealHistoryGetDto from "../../../day-history/dto/meal-history-get.dto";
import {GetAndCheckProfileId, GetCurrentUser, GetCurrentUserId} from "../../../auth/decorators/decorators";
import {DateParam} from "../../../Common/params/date.param";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {GoalsGetService} from "../../../goals/services/goals-get/goals-get.service";
import {WeightHistoryGetService} from "../../../weight-history/services/weight-history-get/weight-history-get.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {UserDayHistoryQuery} from "../../../Connections/connection/data/UserDayHistoryQuery";
import {RoleEnum} from "../../../Common/Role/utils/roles";

@UseGuards(AccessTokenGuard)
@Controller('meal-history')
export class MealHistoryGetController {

    constructor(private prismaService:PrismaService,
                private dayHistoryGetService:DayHistoryGetService,
                private dayHistoryCheckService:DayHistoryCheckService,
                private mealHistoryGetService:MealHistoryGetService,
                private goalsGetService:GoalsGetService,
                private weightHistoryGetService:WeightHistoryGetService) {
    }

    @Get('/')
    async getMealHistory(@Query() historyGetDto:MealHistoryGetDto, @GetAndCheckProfileId() currentProfileId) {
        const {date, periodName} = historyGetDto
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(currentProfileId, date)
        if (!isDayHistoryExist) {
            return []
        }
        const {dayId} = await this.dayHistoryGetService.getDayIdByDate(date, currentProfileId)
        return this.dayHistoryGetService.getAllMealHistoryByIds(dayId, periodName)
    }

    @Get('data/')
    async getDayHistoryData(@Query() dayHistoryQuery: UserDayHistoryQuery,
                            @GetAndCheckProfileId() currentProfileId,
                            @GetCurrentUser('role') role: RoleEnum,
                            @GetCurrentUserId() currentUserId: number) {
       return this.mealHistoryGetService.getDayHistoryData(currentUserId, dayHistoryQuery.date, dayHistoryQuery.id, currentProfileId, role)
    }





}

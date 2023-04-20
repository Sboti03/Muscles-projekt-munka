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
import {WeightHistoryGetService} from "../../../weight-history/services/weight-history-get/weight-history-get.service";

@UseGuards(AccessTokenGuard)
@Controller('day-history')
export class DayHistoryGetController {







}

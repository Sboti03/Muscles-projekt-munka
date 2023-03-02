import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {RoleEnum} from "../../../Common/Role/utils/roles";
import {CreateMealHistoryDto} from "../../dto/createMealHistory.dto";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCreateService} from "../../../day-history/services/day-history-create/day-history-create.service";
import {MealCreateService} from "../../../meal/services/meal-create/meal-create.service";
import {MealGetService} from "../../../meal/services/meal-get/meal-get.service";
import {MealHistoryCreateService} from "../../services/meal-history-create/meal-history-create.service";
import {MealHistoryConvertService} from "../../services/meal-history-convert/meal-history-convert.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../../auth/guards/profile.guard";


@UseGuards(AccessTokenGuard, ProfileGuard)
@Controller('meal-history')
export class MealHistoryCreateController {

    constructor(private dayHistoryGetService: DayHistoryGetService,
                private dayHistoryCreateService: DayHistoryCreateService,
                private mealCreateService: MealCreateService,
                private mealGetService: MealGetService,
                private mealHistoryCreateService: MealHistoryCreateService,
                private mealHistoryConvertService: MealHistoryConvertService,
                private dayHistoryCheckService: DayHistoryCheckService) {
    }

    @Post('/create')
    async createMealHistory(@GetCurrentUser('role') addedBy: RoleEnum, @Body() createMealHistoryDTO: CreateMealHistoryDto, @GetCurrentUserProfileId() profileId: number) {
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, createMealHistoryDTO.date)
        if (!isDayHistoryExist) {
            await this.dayHistoryCreateService.createDayHistory(profileId, createMealHistoryDTO.date);
        }
        const {dayId} = await this.dayHistoryGetService.getDayIdByDate(createMealHistoryDTO.date, profileId);
        const mealCreateInput = this.mealGetService.getMealCreateInput(createMealHistoryDTO, addedBy)
        const {mealId} = await this.mealCreateService.createMeal(mealCreateInput)
        const mealHistoryCreateInput = await this.mealHistoryConvertService.convertMealHistoryDtoToInput(dayId, mealId, createMealHistoryDTO)
        return this.mealHistoryCreateService.createMealHistory(mealHistoryCreateInput)
    }
}

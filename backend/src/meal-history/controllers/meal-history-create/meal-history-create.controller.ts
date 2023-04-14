import { Body, Controller, Logger, NotFoundException, Post, UseGuards } from "@nestjs/common";
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
import {FoodCheckService} from "../../../foods/services/food-check/food-check.service";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";


@UseGuards(AccessTokenGuard)
@Controller('meal-history')
export class MealHistoryCreateController {

    constructor(private dayHistoryGetService: DayHistoryGetService,
                private dayHistoryCreateService: DayHistoryCreateService,
                private mealCreateService: MealCreateService,
                private mealGetService: MealGetService,
                private mealHistoryCreateService: MealHistoryCreateService,
                private mealHistoryConvertService: MealHistoryConvertService,
                private dayHistoryCheckService: DayHistoryCheckService,
                private foodCheckService:FoodCheckService,
                private connectionCheckService:ConnectionCheckService) {
    }

    @Post('/create')
    async createMealHistory(@GetCurrentUser('role') addedBy: RoleEnum, @Body() createMealHistoryDTO: CreateMealHistoryDto, @GetCurrentUserProfileId() profileId: number) {
        Logger.log(`/meal-history/create (POST) profileId: ${profileId} addedBy: ${addedBy} BODY: 
        foodId: ${createMealHistoryDTO.foodId}
        date: ${createMealHistoryDTO.date.toISOString()}
        amount: ${createMealHistoryDTO.amount}
        periodName: ${createMealHistoryDTO.periodName}`)

        const userId = createMealHistoryDTO.userId ? createMealHistoryDTO.userId : profileId
        const coachId = createMealHistoryDTO.userId ? profileId : undefined

        if (coachId) {
            const isConnectionExist = this.connectionCheckService.checkAccessCoachToUser(userId, coachId)
            if (!isConnectionExist) {
                throw new NotFoundException("No connection found")
            }
        }
        const isFoodExist = await this.foodCheckService.checkValidFood(createMealHistoryDTO.foodId)
        if (!isFoodExist) {
            throw new NotFoundException('No food found')
        }
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(userId, createMealHistoryDTO.date)
        if (!isDayHistoryExist) {
            await this.dayHistoryCreateService.createDayHistory(userId, createMealHistoryDTO.date);
        }
        const {dayId} = await this.dayHistoryGetService.getDayIdByDate(createMealHistoryDTO.date, userId);
        const mealCreateInput = this.mealGetService.getMealCreateInput(createMealHistoryDTO, addedBy)
        const {mealId} = await this.mealCreateService.createMeal(mealCreateInput)
        const mealHistoryCreateInput = await this.mealHistoryConvertService.convertMealHistoryDtoToInput(dayId, mealId, createMealHistoryDTO)
        return this.mealHistoryCreateService.createMealHistory(mealHistoryCreateInput)
    }
}

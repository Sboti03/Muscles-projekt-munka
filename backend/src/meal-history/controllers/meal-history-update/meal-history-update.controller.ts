import {Controller, NotAcceptableException, NotFoundException, Post} from '@nestjs/common';
import {UpdateMealHistoryDTO} from "../../dto/updateMealHistoryDTO";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {MealHistoryConvertService} from "../../services/meal-history-convert/meal-history-convert.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {MealUpdateService} from "../../../meal/services/meal-update/meal-update.service";
import {MealHistoryCheckService} from "../../services/meal-history-check/meal-history-check.service";

@Controller('meal-history')
export class MealHistoryUpdateController {
    constructor(private mealHistoryConvertService: MealHistoryConvertService,
                private dayHistoryCheckService: DayHistoryCheckService,
                private mealHistoryGetService: MealHistoryGetService,
                private mealUpdateService: MealUpdateService,
                private mealHistoryCheckService:MealHistoryCheckService) {

    }


    @Post('/update')
    // @UseGuards(AccessTokenGuard)
    async updateMealHistory(updateMealHistoryDTO: UpdateMealHistoryDTO, @GetCurrentUserProfileId() currentProfileId: number){

        const isMealHistoryExisting = await this.mealHistoryCheckService.checkExistingMealHistoryById(updateMealHistoryDTO.mealHistoryId)
        if (!isMealHistoryExisting) {
            throw new NotFoundException('No Meal history found');
        }

        const {day: {profileId}} = await this.mealHistoryGetService.getProfileIdByMealHistoryId(updateMealHistoryDTO.mealHistoryId)
        if (currentProfileId !== profileId) {
            throw new NotAcceptableException('Different user')
        }

        const {mealId} = await this.mealHistoryGetService.getMealIdByMealHistoryId(updateMealHistoryDTO.mealHistoryId)
        const mealsUpdateInput = await this.mealHistoryConvertService.convertMealHistoryUpdateDtoToMealUpdateInput(updateMealHistoryDTO)

        return this.mealUpdateService.updateMealByMealId(mealsUpdateInput, mealId)
    }

}
0
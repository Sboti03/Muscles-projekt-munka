import {Body, ConflictException, Controller, Delete, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import DeleteMealHistoryDto from "../../dto/deleteMealHistory.dto";
import {MealHistoryCheckService} from "../../services/meal-history-check/meal-history-check.service";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {MealDeleteService} from "../../../meal/services/meal-delete/meal-delete.service";

@UseGuards(AccessTokenGuard, ProfileGuard)
@Controller('meal-history')
export class MealHistoryDeleteController {

    constructor(private mealHistoryCheckService:MealHistoryCheckService,
                private mealHistoryGetService:MealHistoryGetService,
                private mealDeleteService:MealDeleteService) {
    }
    @Delete(':id')
    async deleteMealHistory(@GetCurrentUserProfileId() currentProfileId: number,@Param('id') deleteMealHistoryDTO: DeleteMealHistoryDto) {
        const {mealHistoryId} = deleteMealHistoryDTO
        const isMealHistoryExist = await this.mealHistoryCheckService.checkExistingMealHistoryById(mealHistoryId)
        if (!isMealHistoryExist) {
            throw new NotFoundException('No meal history found')
        }
        const {day: {profileId}} = await this.mealHistoryGetService.getProfileIdByMealHistoryId(mealHistoryId)
        if (profileId !== currentProfileId) {
            throw new ConflictException('Not the same profile')
        }
        const {mealId} = await this.mealHistoryGetService.getMealIdByMealHistoryId(mealHistoryId)
        return this.mealDeleteService.deleteMealByMealId(mealId)
    }

}

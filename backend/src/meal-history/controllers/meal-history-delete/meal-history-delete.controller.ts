import {Body, ConflictException, Controller, Delete, NotFoundException, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import DeleteMealHistoryDTO from "../../dto/deleteMealHistoryDTO";
import {MealHistoryCheckService} from "../../services/meal-history-check/meal-history-check.service";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {MealDeleteService} from "../../../meal/services/meal-delete/meal-delete.service";
import {MealHistoryDeleteService} from "../../services/meal-history-delete/meal-history-delete.service";

@UseGuards(AccessTokenGuard, ProfileGuard)
@Controller('meal-history')
export class MealHistoryDeleteController {

    constructor(private mealHistoryCheckService:MealHistoryCheckService,
                private mealHistoryGetService:MealHistoryGetService,
                private mealHistoryDeleteService:MealHistoryDeleteService) {
    }
    @Delete()
    async deleteMealHistory(@GetCurrentUserProfileId() currentProfileId: number,@Body() deleteMealHistoryDTO: DeleteMealHistoryDTO) {
        const {mealHistoryId} = deleteMealHistoryDTO
        const isMealHistoryExist = await this.mealHistoryCheckService.checkExistingMealHistoryById(mealHistoryId)
        if (!isMealHistoryExist) {
            throw new NotFoundException('No meal history found')
        }
        const {day: {profileId}} = await this.mealHistoryGetService.getProfileIdByMealHistoryId(mealHistoryId)
        if (profileId !== currentProfileId) {
            throw new ConflictException('Not the same profile')
        }
        return this.mealHistoryDeleteService.deleteMealHistoryById(mealHistoryId)
    }

}

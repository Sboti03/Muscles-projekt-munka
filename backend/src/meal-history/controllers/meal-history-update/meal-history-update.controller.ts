import {
    Body,
    Controller, Logger,
    NotAcceptableException,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards
} from "@nestjs/common";
import {UpdateMealHistoryDto} from "../../dto/updateMealHistory.dto";
import {GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {MealHistoryConvertService} from "../../services/meal-history-convert/meal-history-convert.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {MealUpdateService} from "../../../meal/services/meal-update/meal-update.service";
import {MealHistoryCheckService} from "../../services/meal-history-check/meal-history-check.service";
import {AccessTokenGuard} from "../../../auth/guards/access-token.guard";
import {ProfileGuard} from "../../../auth/guards/profile.guard";
import { IdParam } from "../../../Common/params/id.param";
import {
    ConnectionCheckService
} from "../../../Connections/connection/services/connection-check/connection-check.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('meal-history')
@UseGuards(AccessTokenGuard, ProfileGuard)
@Controller('meal-history')
export class MealHistoryUpdateController {
    constructor(private mealHistoryConvertService: MealHistoryConvertService,
                private dayHistoryCheckService: DayHistoryCheckService,
                private mealHistoryGetService: MealHistoryGetService,
                private mealUpdateService: MealUpdateService,
                private mealHistoryCheckService:MealHistoryCheckService,
                private connectionCheckService: ConnectionCheckService) {

    }


    @Patch('/update/:id')
    async updateMealHistory(@Param() idParam: IdParam, @Body() updateMealHistoryDTO: UpdateMealHistoryDto, @GetCurrentUserProfileId() currentProfileId: number){
        const {id: mealHistoryId} = idParam
        const userId = updateMealHistoryDTO.userId ? updateMealHistoryDTO.userId : currentProfileId
        const coachId = updateMealHistoryDTO.userId ? currentProfileId : undefined
        if (coachId) {
            const isConnectionExist = this.connectionCheckService.checkAccessCoachToUser(userId, coachId)
            if (!isConnectionExist) {
                throw new NotFoundException("No connection found")
            }
        }
        Logger.log(`/meal-history/update/${mealHistoryId} (PATCH) Updating meal-history dto: 
        amount: ${updateMealHistoryDTO.amount}
        completed: ${updateMealHistoryDTO.isCompleted}
        `)

        const isMealHistoryExisting = await this.mealHistoryCheckService.checkExistingMealHistoryById(mealHistoryId)
        if (!isMealHistoryExisting) {
            throw new NotFoundException('No Meal history found');
        }

        const {day: {profileId}} = await this.mealHistoryGetService.getProfileIdByMealHistoryId(mealHistoryId)
        if (userId !== profileId) {
            throw new NotAcceptableException('Different user')
        }

        const {mealId} = await this.mealHistoryGetService.getMealIdByMealHistoryId(mealHistoryId)
        const mealsUpdateInput = await this.mealHistoryConvertService.convertMealHistoryUpdateDtoToMealUpdateInput(updateMealHistoryDTO)

        return this.mealUpdateService.updateMealByMealId(mealsUpdateInput, mealId)
    }

}

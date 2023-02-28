import {Controller, ForbiddenException, Post, UseGuards} from '@nestjs/common';
import {GetCurrentUser, GetCurrentUserProfileId} from "../../../auth/decorators/decorators";
import {PrismaService} from "../../../utils/prirsma.service";
import {DayHistoryGetService} from "../../../day-history/services/day-history-get/day-history-get.service";
import {DayHistoryCreateService} from "../../../day-history/services/day-history-create/day-history-create.service";
import {MealCreateService} from "../../../meal/services/meal-create/meal-create.service";
import {RoleEnum} from "../../../Role/utils/roles";
import {MealHistoryCreateService} from "../../services/meal-history-create/meal-history-create.service";
import {CreateMealHistoryDTO} from "../../dto/createMealHistoryDTO";
import {MealHistoryConvertService} from "../../services/meal-history-convert/meal-history-convert.service";
import {DayHistoryCheckService} from "../../../day-history/services/day-history-check/day-history-check.service";
import {UpdateMealHistoryDTO} from "../../dto/updateMealHistoryDTO";
import {MealHistoryGetService} from "../../services/meal-history-get/meal-history-get.service";
import {MealUpdateService} from "../../../meal/services/meal-update/meal-update.service";
import {MealHistoryCheckService} from "../../services/meal-history-check/meal-history-check";
import {MealGetService} from "../../../meal/services/meal-get/meal-get.service";

@Controller('meal-history')
export class MealHistoryController {

   constructor(private prismaService: PrismaService,
               private dayHistoryGetService: DayHistoryGetService,
               private dayHistoryCreateService: DayHistoryCreateService,
               private mealCreateService: MealCreateService,
               private mealGetService: MealGetService,
               private mealHistoryCreateService: MealHistoryCreateService,
               private mealHistoryConvertService: MealHistoryConvertService,
               private dayHistoryCheckService: DayHistoryCheckService,
               private mealHistoryGetService: MealHistoryGetService,
               private mealUpdateService: MealUpdateService,
               private mealHistoryCheckService: MealHistoryCheckService) {}

   @Post('/create')
   @UseGuards(AccessTokenGuard)
   async createMealHistory(@GetCurrentUser('role') addedBy: RoleEnum,createMealHistoryDTO: CreateMealHistoryDTO, @GetCurrentUserProfileId() profileId: number){
      const isDayHistoryExist = this.dayHistoryCheckService.checkExistingDayHistory(profileId, createMealHistoryDTO.date)
      if (!isDayHistoryExist) {
         await this.dayHistoryCreateService.createDayHistory(profileId, createMealHistoryDTO.date);
      }
      const {dayId} = (await this.dayHistoryGetService.getDayIdByDate(createMealHistoryDTO.date, profileId));
      const mealCreateInput = this.mealGetService.getMealCreateInput(createMealHistoryDTO, addedBy)
      const {mealId} = await this.mealCreateService.createMeal(mealCreateInput)
      const mealHistoryCreateInput = await this.mealHistoryConvertService.convertMealHistoryDtoToInput(dayId, mealId, createMealHistoryDTO, profileId)
      return this.mealHistoryCreateService.createMealHistory(mealHistoryCreateInput)
   }

   @Post('/update')
   @UseGuards(AccessTokenGuard)
   async updateMealHistory(updateMealHistoryDTO: UpdateMealHistoryDTO, @GetCurrentUserProfileId() profileId: number){
      const isDayHistoryExist = this.dayHistoryCheckService.checkExistingDayHistory(profileId, updateMealHistoryDTO.date)
      if (!isDayHistoryExist) {
         throw new ForbiddenException('This DayHistory doesnt exist');
      }
      const {dayId} = (await this.dayHistoryGetService.getDayIdByDate(updateMealHistoryDTO.date, profileId));
      const {mealId} = await this.mealHistoryGetService.getMealHistoryMealId(dayId, updateMealHistoryDTO.periodName, updateMealHistoryDTO.foodId)
      if (!mealId) {
         throw new ForbiddenException('This meal does not exist');
      }
      const areThereChanges = this.mealHistoryCheckService.areThereAnyChangesOnUpdateMealHistoryDTO(updateMealHistoryDTO)
      if (areThereChanges) {
         if (updateMealHistoryDTO.amount !== undefined) {
            this.mealUpdateService.updateAmountByMealId(mealId, updateMealHistoryDTO.amount)
         } else if (updateMealHistoryDTO.isCompleted !== undefined) {
            this.mealUpdateService.updateCompletedByMealId(mealId, updateMealHistoryDTO.isCompleted)
         }
         return 'Changes were succesful'
      }
      return 'There was not any kind of change'

   }
}

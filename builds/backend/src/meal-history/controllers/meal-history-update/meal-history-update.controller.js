"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealHistoryUpdateController = void 0;
const common_1 = require("@nestjs/common");
const updateMealHistory_dto_1 = require("../../dto/updateMealHistory.dto");
const decorators_1 = require("../../../auth/decorators/decorators");
const meal_history_convert_service_1 = require("../../services/meal-history-convert/meal-history-convert.service");
const day_history_check_service_1 = require("../../../day-history/services/day-history-check/day-history-check.service");
const meal_history_get_service_1 = require("../../services/meal-history-get/meal-history-get.service");
const meal_update_service_1 = require("../../../meal/services/meal-update/meal-update.service");
const meal_history_check_service_1 = require("../../services/meal-history-check/meal-history-check.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const profile_guard_1 = require("../../../auth/guards/profile.guard");
const id_param_1 = require("../../../Common/params/id.param");
const connection_check_service_1 = require("../../../Connections/connection/services/connection-check/connection-check.service");
const swagger_1 = require("@nestjs/swagger");
let MealHistoryUpdateController = class MealHistoryUpdateController {
    constructor(mealHistoryConvertService, dayHistoryCheckService, mealHistoryGetService, mealUpdateService, mealHistoryCheckService, connectionCheckService) {
        this.mealHistoryConvertService = mealHistoryConvertService;
        this.dayHistoryCheckService = dayHistoryCheckService;
        this.mealHistoryGetService = mealHistoryGetService;
        this.mealUpdateService = mealUpdateService;
        this.mealHistoryCheckService = mealHistoryCheckService;
        this.connectionCheckService = connectionCheckService;
    }
    async updateMealHistory(idParam, updateMealHistoryDTO, currentProfileId) {
        const { id: mealHistoryId } = idParam;
        const userId = updateMealHistoryDTO.userId ? updateMealHistoryDTO.userId : currentProfileId;
        const coachId = updateMealHistoryDTO.userId ? currentProfileId : undefined;
        if (coachId) {
            const isConnectionExist = this.connectionCheckService.checkAccessCoachToUser(userId, coachId);
            if (!isConnectionExist) {
                throw new common_1.NotFoundException("No connection found");
            }
        }
        common_1.Logger.log(`/meal-history/update/${mealHistoryId} (PATCH) Updating meal-history dto: 
        amount: ${updateMealHistoryDTO.amount}
        completed: ${updateMealHistoryDTO.isCompleted}
        `);
        const isMealHistoryExisting = await this.mealHistoryCheckService.checkExistingMealHistoryById(mealHistoryId);
        if (!isMealHistoryExisting) {
            throw new common_1.NotFoundException('No Meal history found');
        }
        const { day: { profileId } } = await this.mealHistoryGetService.getProfileIdByMealHistoryId(mealHistoryId);
        if (userId !== profileId) {
            throw new common_1.NotAcceptableException('Different user');
        }
        const { mealId } = await this.mealHistoryGetService.getMealIdByMealHistoryId(mealHistoryId);
        const mealsUpdateInput = await this.mealHistoryConvertService.convertMealHistoryUpdateDtoToMealUpdateInput(updateMealHistoryDTO);
        return this.mealUpdateService.updateMealByMealId(mealsUpdateInput, mealId);
    }
};
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, updateMealHistory_dto_1.UpdateMealHistoryDto, Number]),
    __metadata("design:returntype", Promise)
], MealHistoryUpdateController.prototype, "updateMealHistory", null);
MealHistoryUpdateController = __decorate([
    (0, swagger_1.ApiTags)('meal-history'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, profile_guard_1.ProfileGuard),
    (0, common_1.Controller)('meal-history'),
    __metadata("design:paramtypes", [meal_history_convert_service_1.MealHistoryConvertService,
        day_history_check_service_1.DayHistoryCheckService,
        meal_history_get_service_1.MealHistoryGetService,
        meal_update_service_1.MealUpdateService,
        meal_history_check_service_1.MealHistoryCheckService,
        connection_check_service_1.ConnectionCheckService])
], MealHistoryUpdateController);
exports.MealHistoryUpdateController = MealHistoryUpdateController;
//# sourceMappingURL=meal-history-update.controller.js.map
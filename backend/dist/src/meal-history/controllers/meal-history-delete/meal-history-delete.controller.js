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
exports.MealHistoryDeleteController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const profile_guard_1 = require("../../../auth/guards/profile.guard");
const meal_history_check_service_1 = require("../../services/meal-history-check/meal-history-check.service");
const decorators_1 = require("../../../auth/decorators/decorators");
const meal_history_get_service_1 = require("../../services/meal-history-get/meal-history-get.service");
const meal_delete_service_1 = require("../../../meal/services/meal-delete/meal-delete.service");
const id_param_1 = require("../../../Common/params/id.param");
let MealHistoryDeleteController = class MealHistoryDeleteController {
    constructor(mealHistoryCheckService, mealHistoryGetService, mealDeleteService) {
        this.mealHistoryCheckService = mealHistoryCheckService;
        this.mealHistoryGetService = mealHistoryGetService;
        this.mealDeleteService = mealDeleteService;
    }
    async deleteMealHistory(currentProfileId, idParam) {
        const { id: mealHistoryId } = idParam;
        const isMealHistoryExist = await this.mealHistoryCheckService.checkExistingMealHistoryById(mealHistoryId);
        if (!isMealHistoryExist) {
            throw new common_1.NotFoundException('No meal history found');
        }
        const { day: { profileId } } = await this.mealHistoryGetService.getProfileIdByMealHistoryId(mealHistoryId);
        if (profileId !== currentProfileId) {
            throw new common_1.ConflictException('Not the same profile');
        }
        const { mealId } = await this.mealHistoryGetService.getMealIdByMealHistoryId(mealHistoryId);
        return this.mealDeleteService.deleteMealByMealId(mealId);
    }
};
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], MealHistoryDeleteController.prototype, "deleteMealHistory", null);
MealHistoryDeleteController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, profile_guard_1.ProfileGuard),
    (0, common_1.Controller)('meal-history'),
    __metadata("design:paramtypes", [meal_history_check_service_1.MealHistoryCheckService,
        meal_history_get_service_1.MealHistoryGetService,
        meal_delete_service_1.MealDeleteService])
], MealHistoryDeleteController);
exports.MealHistoryDeleteController = MealHistoryDeleteController;
//# sourceMappingURL=meal-history-delete.controller.js.map
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
exports.MealHistoryCreateController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../auth/decorators/decorators");
const roles_1 = require("../../../Common/Role/utils/roles");
const createMealHistory_dto_1 = require("../../dto/createMealHistory.dto");
const day_history_get_service_1 = require("../../../day-history/services/day-history-get/day-history-get.service");
const day_history_create_service_1 = require("../../../day-history/services/day-history-create/day-history-create.service");
const meal_create_service_1 = require("../../../meal/services/meal-create/meal-create.service");
const meal_get_service_1 = require("../../../meal/services/meal-get/meal-get.service");
const meal_history_create_service_1 = require("../../services/meal-history-create/meal-history-create.service");
const meal_history_convert_service_1 = require("../../services/meal-history-convert/meal-history-convert.service");
const day_history_check_service_1 = require("../../../day-history/services/day-history-check/day-history-check.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const profile_guard_1 = require("../../../auth/guards/profile.guard");
const food_check_service_1 = require("../../../foods/services/food-check/food-check.service");
let MealHistoryCreateController = class MealHistoryCreateController {
    constructor(dayHistoryGetService, dayHistoryCreateService, mealCreateService, mealGetService, mealHistoryCreateService, mealHistoryConvertService, dayHistoryCheckService, foodCheckService) {
        this.dayHistoryGetService = dayHistoryGetService;
        this.dayHistoryCreateService = dayHistoryCreateService;
        this.mealCreateService = mealCreateService;
        this.mealGetService = mealGetService;
        this.mealHistoryCreateService = mealHistoryCreateService;
        this.mealHistoryConvertService = mealHistoryConvertService;
        this.dayHistoryCheckService = dayHistoryCheckService;
        this.foodCheckService = foodCheckService;
    }
    async createMealHistory(addedBy, createMealHistoryDTO, profileId) {
        const isFoodExist = await this.foodCheckService.checkValidFood(createMealHistoryDTO.foodId);
        if (!isFoodExist) {
            throw new common_1.NotFoundException('No food found');
        }
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, createMealHistoryDTO.date);
        if (!isDayHistoryExist) {
            await this.dayHistoryCreateService.createDayHistory(profileId, createMealHistoryDTO.date);
        }
        const { dayId } = await this.dayHistoryGetService.getDayIdByDate(createMealHistoryDTO.date, profileId);
        const mealCreateInput = this.mealGetService.getMealCreateInput(createMealHistoryDTO, addedBy);
        const { mealId } = await this.mealCreateService.createMeal(mealCreateInput);
        const mealHistoryCreateInput = await this.mealHistoryConvertService.convertMealHistoryDtoToInput(dayId, mealId, createMealHistoryDTO);
        return this.mealHistoryCreateService.createMealHistory(mealHistoryCreateInput);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, decorators_1.GetCurrentUser)('role')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createMealHistory_dto_1.CreateMealHistoryDto, Number]),
    __metadata("design:returntype", Promise)
], MealHistoryCreateController.prototype, "createMealHistory", null);
MealHistoryCreateController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, profile_guard_1.ProfileGuard),
    (0, common_1.Controller)('meal-history'),
    __metadata("design:paramtypes", [day_history_get_service_1.DayHistoryGetService,
        day_history_create_service_1.DayHistoryCreateService,
        meal_create_service_1.MealCreateService,
        meal_get_service_1.MealGetService,
        meal_history_create_service_1.MealHistoryCreateService,
        meal_history_convert_service_1.MealHistoryConvertService,
        day_history_check_service_1.DayHistoryCheckService,
        food_check_service_1.FoodCheckService])
], MealHistoryCreateController);
exports.MealHistoryCreateController = MealHistoryCreateController;
//# sourceMappingURL=meal-history-create.controller.js.map
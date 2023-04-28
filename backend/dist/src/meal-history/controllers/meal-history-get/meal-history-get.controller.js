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
exports.MealHistoryGetController = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const meal_history_get_dto_1 = require("../../../day-history/dto/meal-history-get.dto");
const decorators_1 = require("../../../auth/decorators/decorators");
const day_history_get_service_1 = require("../../../day-history/services/day-history-get/day-history-get.service");
const day_history_check_service_1 = require("../../../day-history/services/day-history-check/day-history-check.service");
const meal_history_get_service_1 = require("../../services/meal-history-get/meal-history-get.service");
const goals_get_service_1 = require("../../../goals/services/goals-get/goals-get.service");
const weight_history_get_service_1 = require("../../../weight-history/services/weight-history-get/weight-history-get.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const UserDayHistoryQuery_1 = require("../../../Connections/connection/data/UserDayHistoryQuery");
const roles_1 = require("../../../Common/Role/utils/roles");
let MealHistoryGetController = class MealHistoryGetController {
    constructor(prismaService, dayHistoryGetService, dayHistoryCheckService, mealHistoryGetService, goalsGetService, weightHistoryGetService) {
        this.prismaService = prismaService;
        this.dayHistoryGetService = dayHistoryGetService;
        this.dayHistoryCheckService = dayHistoryCheckService;
        this.mealHistoryGetService = mealHistoryGetService;
        this.goalsGetService = goalsGetService;
        this.weightHistoryGetService = weightHistoryGetService;
    }
    async getMealHistory(historyGetDto, currentProfileId) {
        const { date, periodName } = historyGetDto;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(currentProfileId, date);
        if (!isDayHistoryExist) {
            return [];
        }
        const { dayId } = await this.dayHistoryGetService.getDayIdByDate(date, currentProfileId);
        return this.dayHistoryGetService.getAllMealHistoryByIds(dayId, periodName);
    }
    async getDayHistoryData(dayHistoryQuery, currentProfileId, role, currentUserId) {
        return this.mealHistoryGetService.getDayHistoryData(currentUserId, dayHistoryQuery.date, dayHistoryQuery.id, currentProfileId, role);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetAndCheckProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meal_history_get_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], MealHistoryGetController.prototype, "getMealHistory", null);
__decorate([
    (0, common_1.Get)('data/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetAndCheckProfileId)()),
    __param(2, (0, decorators_1.GetCurrentUser)('role')),
    __param(3, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDayHistoryQuery_1.UserDayHistoryQuery, Object, String, Number]),
    __metadata("design:returntype", Promise)
], MealHistoryGetController.prototype, "getDayHistoryData", null);
MealHistoryGetController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('meal-history'),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        day_history_get_service_1.DayHistoryGetService,
        day_history_check_service_1.DayHistoryCheckService,
        meal_history_get_service_1.MealHistoryGetService,
        goals_get_service_1.GoalsGetService,
        weight_history_get_service_1.WeightHistoryGetService])
], MealHistoryGetController);
exports.MealHistoryGetController = MealHistoryGetController;
//# sourceMappingURL=meal-history-get.controller.js.map
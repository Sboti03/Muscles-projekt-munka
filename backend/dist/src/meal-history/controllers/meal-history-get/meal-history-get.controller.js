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
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const UserDayHistoryQuery_1 = require("../../../Connections/connection/data/UserDayHistoryQuery");
const DayHistoryBetween_query_1 = require("../../dto/DayHistoryBetween.query");
const swagger_1 = require("@nestjs/swagger");
let MealHistoryGetController = class MealHistoryGetController {
    constructor(prismaService, dayHistoryGetService, dayHistoryCheckService, mealHistoryGetService) {
        this.prismaService = prismaService;
        this.dayHistoryGetService = dayHistoryGetService;
        this.dayHistoryCheckService = dayHistoryCheckService;
        this.mealHistoryGetService = mealHistoryGetService;
    }
    async getMealHistory(historyGetDto, currentProfileId, currentUserId) {
        return this.mealHistoryGetService.getMealHistory(historyGetDto, currentProfileId, currentUserId);
    }
    async getMealHistoryData(dayHistoryQuery, currentProfileId, currentUserId) {
        return this.mealHistoryGetService.getMealHistoryData(currentUserId, dayHistoryQuery.date, dayHistoryQuery.userId, currentProfileId);
    }
    async getMealHistoryBetween(dayHistoryBetweenQuery, currentProfileId, currentUserId) {
        const { to, from, userId } = dayHistoryBetweenQuery;
        common_1.Logger.log(`/meal-history/data/between (GET) from: ${from.toISOString()} to: ${to.toISOString()} requesterId: ${currentUserId} ${userId ? 'requested: ' + userId : ''}`);
        return this.mealHistoryGetService.getMealHistoryBetween(currentUserId, currentProfileId, from, to, userId);
    }
};
__decorate([
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetAndCheckProfileId)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [meal_history_get_dto_1.default, Object, Number]),
    __metadata("design:returntype", Promise)
], MealHistoryGetController.prototype, "getMealHistory", null);
__decorate([
    (0, common_1.Get)("data/"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetAndCheckProfileId)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDayHistoryQuery_1.UserDayHistoryQuery, Object, Number]),
    __metadata("design:returntype", Promise)
], MealHistoryGetController.prototype, "getMealHistoryData", null);
__decorate([
    (0, common_1.Get)('data/between'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetCurrentUserProfileId)()),
    __param(2, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DayHistoryBetween_query_1.default, Number, Number]),
    __metadata("design:returntype", Promise)
], MealHistoryGetController.prototype, "getMealHistoryBetween", null);
MealHistoryGetController = __decorate([
    (0, swagger_1.ApiTags)('meal-history'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)("meal-history"),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        day_history_get_service_1.DayHistoryGetService,
        day_history_check_service_1.DayHistoryCheckService,
        meal_history_get_service_1.MealHistoryGetService])
], MealHistoryGetController);
exports.MealHistoryGetController = MealHistoryGetController;
//# sourceMappingURL=meal-history-get.controller.js.map
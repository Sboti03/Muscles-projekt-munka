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
exports.WeightHistoryGetController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../auth/decorators/decorators");
const date_param_1 = require("../../../Common/params/date.param");
const day_history_get_service_1 = require("../../../day-history/services/day-history-get/day-history-get.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
let WeightHistoryGetController = class WeightHistoryGetController {
    constructor(dayHistoryGetService) {
        this.dayHistoryGetService = dayHistoryGetService;
    }
    async getAllWeight(profileId) {
        return this.dayHistoryGetService.getAllWeight(profileId);
    }
    async getWeight(currentDate, currentProfileId) {
        const day = await this.dayHistoryGetService.getLatestDayId(currentDate.date);
        if (!day) {
            throw new common_1.ConflictException('No day found');
        }
        return this.dayHistoryGetService.getWeightByDayId(day.dayId);
    }
};
__decorate([
    (0, common_1.Get)('/weight/all'),
    __param(0, (0, decorators_1.GetAndCheckProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WeightHistoryGetController.prototype, "getAllWeight", null);
__decorate([
    (0, common_1.Get)('/weight/:date'),
    __param(0, (0, common_1.Param)('date')),
    __param(1, (0, decorators_1.GetAndCheckProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_param_1.DateParam, Object]),
    __metadata("design:returntype", Promise)
], WeightHistoryGetController.prototype, "getWeight", null);
WeightHistoryGetController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('weight-history'),
    __metadata("design:paramtypes", [day_history_get_service_1.DayHistoryGetService])
], WeightHistoryGetController);
exports.WeightHistoryGetController = WeightHistoryGetController;
//# sourceMappingURL=weight-history-get.controller.js.map
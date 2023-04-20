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
exports.WeightHistoryController = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const decorators_1 = require("../../../auth/decorators/decorators");
const day_history_create_service_1 = require("../../../day-history/services/day-history-create/day-history-create.service");
const weight_history_update_or_create_service_1 = require("../../services/weight-history-update-or-create/weight-history-update-or-create.service");
const day_history_get_service_1 = require("../../../day-history/services/day-history-get/day-history-get.service");
const WeightHistoryData_dto_1 = require("../../dto/WeightHistoryData.dto");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const swagger_1 = require("@nestjs/swagger");
let WeightHistoryController = class WeightHistoryController {
    constructor(prismaService, dayHistoryCreateService, weightHistoryUpdateOrCreateService, dayHistoryGetService) {
        this.prismaService = prismaService;
        this.dayHistoryCreateService = dayHistoryCreateService;
        this.weightHistoryUpdateOrCreateService = weightHistoryUpdateOrCreateService;
        this.dayHistoryGetService = dayHistoryGetService;
    }
    async createOrUpdate(weightHistoryData, currentProfileId) {
        let dayId;
        try {
            dayId = (await this.dayHistoryGetService.getDayIdByDate(weightHistoryData.date, currentProfileId)).dayId;
        }
        catch (e) {
            dayId = (await this.dayHistoryCreateService.createDayHistory(currentProfileId, weightHistoryData.date)).dayId;
        }
        return this.weightHistoryUpdateOrCreateService.updateOrCreateWeightHistory(weightHistoryData.weight, dayId);
    }
};
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetAndCheckProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WeightHistoryData_dto_1.WeightHistoryDataDto, Object]),
    __metadata("design:returntype", Promise)
], WeightHistoryController.prototype, "createOrUpdate", null);
WeightHistoryController = __decorate([
    (0, swagger_1.ApiTags)('weight-history'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('weight-history'),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        day_history_create_service_1.DayHistoryCreateService,
        weight_history_update_or_create_service_1.WeightHistoryUpdateOrCreateService,
        day_history_get_service_1.DayHistoryGetService])
], WeightHistoryController);
exports.WeightHistoryController = WeightHistoryController;
//# sourceMappingURL=weight-history.controller.js.map
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
exports.DayHistoryController = void 0;
const common_1 = require("@nestjs/common");
const day_history_create_service_1 = require("../../services/day-history-create/day-history-create.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const day_history_comment_dto_1 = require("../../dto/day-history-comment.dto");
const connection_check_service_1 = require("../../../Connections/connection/services/connection-check/connection-check.service");
const decorators_1 = require("../../../auth/decorators/decorators");
const day_history_get_service_1 = require("../../services/day-history-get/day-history-get.service");
const swagger_1 = require("@nestjs/swagger");
let DayHistoryController = class DayHistoryController {
    constructor(historyCreateService, connectionCheckService, dayHistoryGetService) {
        this.historyCreateService = historyCreateService;
        this.connectionCheckService = connectionCheckService;
        this.dayHistoryGetService = dayHistoryGetService;
    }
    async comment(dayHistoryCommentDto, coachId) {
        const isConnectionExist = await this.connectionCheckService.checkAccessCoachToUser(dayHistoryCommentDto.userId, coachId);
        if (!isConnectionExist) {
            throw new common_1.NotFoundException('No connection found');
        }
        return this.historyCreateService.commentDayHistory(dayHistoryCommentDto.userId, dayHistoryCommentDto.date, dayHistoryCommentDto.comment);
    }
};
__decorate([
    (0, common_1.Post)('/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [day_history_comment_dto_1.default, Number]),
    __metadata("design:returntype", Promise)
], DayHistoryController.prototype, "comment", null);
DayHistoryController = __decorate([
    (0, swagger_1.ApiTags)('day-history'),
    (0, common_1.Controller)('day-history'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __metadata("design:paramtypes", [day_history_create_service_1.DayHistoryCreateService,
        connection_check_service_1.ConnectionCheckService,
        day_history_get_service_1.DayHistoryGetService])
], DayHistoryController);
exports.DayHistoryController = DayHistoryController;
//# sourceMappingURL=day-history.controller.js.map
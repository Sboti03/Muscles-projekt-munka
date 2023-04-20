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
exports.DayHistoryGetController = void 0;
const common_1 = require("@nestjs/common");
const day_history_get_service_1 = require("../../services/day-history-get/day-history-get.service");
const decorators_1 = require("../../../auth/decorators/decorators");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const comment_get_dto_1 = require("../../dto/comment.get.dto");
const swagger_1 = require("@nestjs/swagger");
let DayHistoryGetController = class DayHistoryGetController {
    constructor(dayHistoryGetService) {
        this.dayHistoryGetService = dayHistoryGetService;
    }
    async findComment(commentGetDto, requesterUserId) {
        const result = await this.dayHistoryGetService.getComment(commentGetDto.date, requesterUserId, commentGetDto.profileId);
        if (result) {
            return result;
        }
        return { comment: '' };
    }
};
__decorate([
    (0, common_1.Get)('comment'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_get_dto_1.CommentGetDto, Number]),
    __metadata("design:returntype", Promise)
], DayHistoryGetController.prototype, "findComment", null);
DayHistoryGetController = __decorate([
    (0, swagger_1.ApiTags)('day-history'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('day-history'),
    __metadata("design:paramtypes", [day_history_get_service_1.DayHistoryGetService])
], DayHistoryGetController);
exports.DayHistoryGetController = DayHistoryGetController;
//# sourceMappingURL=day-history-get.controller.js.map
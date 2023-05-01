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
exports.GoalsGetController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const decorators_1 = require("../../../auth/decorators/decorators");
const goals_get_service_1 = require("../../services/goals-get/goals-get.service");
const swagger_1 = require("@nestjs/swagger");
let GoalsGetController = class GoalsGetController {
    constructor(goalsGetService) {
        this.goalsGetService = goalsGetService;
    }
    async getGoalsById(profileId) {
        return this.goalsGetService.getGoalsByProfileId(profileId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.GetAndCheckProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GoalsGetController.prototype, "getGoalsById", null);
GoalsGetController = __decorate([
    (0, swagger_1.ApiTags)('goals'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('goals'),
    __metadata("design:paramtypes", [goals_get_service_1.GoalsGetService])
], GoalsGetController);
exports.GoalsGetController = GoalsGetController;
//# sourceMappingURL=goals-get.controller.js.map
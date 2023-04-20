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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsCheckService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const goals_get_service_1 = require("../goals-get/goals-get.service");
let GoalsCheckService = class GoalsCheckService {
    constructor(prismaService, goalsGetService) {
        this.prismaService = prismaService;
        this.goalsGetService = goalsGetService;
    }
    async checkGoalsUpdateDto(goalsUpdateDto, profileId) {
        const oldData = await this.goalsGetService.getGoalsByProfileId(profileId);
        const { fatPerDay, proteinPerDay, carbohydratesPerDay, breakfastPerDay, lunchPerDay, dinnerPerDay, otherPerDay } = Object.assign(oldData, goalsUpdateDto);
        const sumOfMacros = fatPerDay + carbohydratesPerDay + proteinPerDay;
        const sumOfPeriodCalories = breakfastPerDay + lunchPerDay + dinnerPerDay + otherPerDay;
        return sumOfMacros === 100 && sumOfPeriodCalories === 100;
    }
};
GoalsCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        goals_get_service_1.GoalsGetService])
], GoalsCheckService);
exports.GoalsCheckService = GoalsCheckService;
//# sourceMappingURL=goals-check.service.js.map
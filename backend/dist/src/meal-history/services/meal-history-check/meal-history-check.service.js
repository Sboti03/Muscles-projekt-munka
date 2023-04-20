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
exports.MealHistoryCheckService = void 0;
const common_1 = require("@nestjs/common");
const meal_history_get_service_1 = require("../meal-history-get/meal-history-get.service");
let MealHistoryCheckService = class MealHistoryCheckService {
    constructor(mealHistoryGetService) {
        this.mealHistoryGetService = mealHistoryGetService;
    }
    async checkExistingMealHistoryById(mealHistoryId) {
        try {
            await this.mealHistoryGetService.getMealHistoryById(mealHistoryId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
MealHistoryCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [meal_history_get_service_1.MealHistoryGetService])
], MealHistoryCheckService);
exports.MealHistoryCheckService = MealHistoryCheckService;
//# sourceMappingURL=meal-history-check.service.js.map
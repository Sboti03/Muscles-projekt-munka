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
exports.MealUpdateService = void 0;
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const common_1 = require("@nestjs/common");
let MealUpdateService = class MealUpdateService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    updateAmountByMealId(mealId, amount) {
        return this.prismaService.meals.update({
            where: {
                mealId,
            },
            data: { amount }
        });
    }
    updateCompletedByMealId(mealId, isCompleted) {
        return this.prismaService.meals.update({
            where: {
                mealId,
            },
            data: {
                completed: isCompleted,
            }
        });
    }
    updateMealByMealId(mealUpdateInput, mealId) {
        return this.prismaService.meals.update({
            where: {
                mealId
            },
            data: mealUpdateInput
        });
    }
};
MealUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], MealUpdateService);
exports.MealUpdateService = MealUpdateService;
//# sourceMappingURL=meal-update.service.js.map
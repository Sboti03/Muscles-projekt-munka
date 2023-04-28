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
exports.MealHistoryConvertService = void 0;
const common_1 = require("@nestjs/common");
let MealHistoryConvertService = class MealHistoryConvertService {
    constructor() {
    }
    async convertMealHistoryDtoToInput(dayId, mealId, createMealHistoryDTO) {
        return {
            day: {
                connect: {
                    dayId
                }
            },
            mealPeriod: {
                connect: {
                    periodName: createMealHistoryDTO.periodName
                }
            },
            meal: {
                connect: {
                    mealId
                }
            }
        };
    }
    async convertMealHistoryUpdateDtoToMealUpdateInput(updateMealHistoryDTO) {
        return {
            amount: updateMealHistoryDTO.amount,
            completed: updateMealHistoryDTO.isCompleted,
        };
    }
};
MealHistoryConvertService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MealHistoryConvertService);
exports.MealHistoryConvertService = MealHistoryConvertService;
//# sourceMappingURL=meal-history-convert.service.js.map
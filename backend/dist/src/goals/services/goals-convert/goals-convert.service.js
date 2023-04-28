"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsConvertService = void 0;
const common_1 = require("@nestjs/common");
let GoalsConvertService = class GoalsConvertService {
    convertGoalsUpdateDtoToInput(goalsUpdateDto) {
        return {
            fatPerDay: goalsUpdateDto.fatPerDay,
            carbohydratesPerDay: goalsUpdateDto.carbohydratesPerDay,
            proteinPerDay: goalsUpdateDto.proteinPerDay,
            targetCalories: goalsUpdateDto.targetCalories,
            targetWeight: goalsUpdateDto.targetWeight,
            breakfastPerDay: goalsUpdateDto.breakfastPerDay,
            lunchPerDay: goalsUpdateDto.lunchPerDay,
            dinnerPerDay: goalsUpdateDto.dinnerPerDay,
            otherPerDay: goalsUpdateDto.otherPerDay
        };
    }
};
GoalsConvertService = __decorate([
    (0, common_1.Injectable)()
], GoalsConvertService);
exports.GoalsConvertService = GoalsConvertService;
//# sourceMappingURL=goals-convert.service.js.map
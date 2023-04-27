"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodConvertService = void 0;
const common_1 = require("@nestjs/common");
let FoodConvertService = class FoodConvertService {
    convertCreateDtoToInput(createDto) {
        return {
            name: createDto.name,
            fat: createDto.fat,
            fiber: createDto.fiber,
            kcal: createDto.kcal,
            carbohydrate: createDto.carbohydrate,
            perUnit: createDto.perUnit,
            protein: createDto.protein,
            unit: { connect: { unit: createDto.unit.valueOf() } },
            sugar: createDto.sugar,
            monounsaturatedFat: createDto.monounsaturatedFat,
            polyunsaturatedFat: createDto.polyunsaturatedFat,
            saturatedFat: createDto.saturatedFat
        };
    }
    convertUpdateDtoToInput(foodUpdateDto) {
        let unit = undefined;
        if (foodUpdateDto.unit) {
            unit = { connect: { unit: foodUpdateDto.unit } };
        }
        return {
            name: foodUpdateDto.name,
            fat: foodUpdateDto.fat,
            fiber: foodUpdateDto.fiber,
            kcal: foodUpdateDto.kcal,
            carbohydrate: foodUpdateDto.carbohydrate,
            perUnit: foodUpdateDto.perUnit,
            protein: foodUpdateDto.protein,
            sugar: foodUpdateDto.sugar,
            monounsaturatedFat: foodUpdateDto.monounsaturatedFat,
            polyunsaturatedFat: foodUpdateDto.polyunsaturatedFat,
            saturatedFat: foodUpdateDto.saturatedFat,
            unit
        };
    }
};
FoodConvertService = __decorate([
    (0, common_1.Injectable)()
], FoodConvertService);
exports.FoodConvertService = FoodConvertService;
//# sourceMappingURL=food-convert.service.js.map
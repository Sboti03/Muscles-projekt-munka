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
exports.FoodUpdateDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const units_1 = require("../../Common/units/units/units");
const class_validator_decorator_1 = require("../../decorators/class-validator.decorator");
const swagger_1 = require("@nestjs/swagger");
class FoodUpdateDto {
}
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", String)
], FoodUpdateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "kcal", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Object.values(units_1.UnitsEnum).find(unit => unit === value)),
    (0, class_validator_decorator_1.IsNullable)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", String)
], FoodUpdateDto.prototype, "unit", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "perUnit", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "protein", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "fat", void 0);
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "saturatedFat", void 0);
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "polyunsaturatedFat", void 0);
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "monounsaturatedFat", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "carbohydrate", void 0);
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "sugar", void 0);
__decorate([
    (0, class_validator_decorator_1.IsNullable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], FoodUpdateDto.prototype, "fiber", void 0);
exports.FoodUpdateDto = FoodUpdateDto;
//# sourceMappingURL=food-update.dto.js.map
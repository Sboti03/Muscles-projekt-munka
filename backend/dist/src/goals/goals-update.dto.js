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
exports.GoalsUpdateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const IsNullable_validation_1 = require("../Common/utils/IsNullable.validation");
class GoalsUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "targetWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "targetCalories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "carbohydratesPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "proteinPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "fatPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "breakfastPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "lunchPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "dinnerPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GoalsUpdateDto.prototype, "otherPerDay", void 0);
exports.GoalsUpdateDto = GoalsUpdateDto;
//# sourceMappingURL=goals-update.dto.js.map
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
exports.CreateMealHistoryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const PeriodNames_1 = require("../../Common/utils/PeriodNames");
const swagger_1 = require("@nestjs/swagger");
const IsNullable_validation_1 = require("../../Common/utils/IsNullable.validation");
class CreateMealHistoryDto {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => Object.values(PeriodNames_1.PeriodNamesEnum).find(periodName => periodName === value)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'breakfast' }),
    __metadata("design:type", String)
], CreateMealHistoryDto.prototype, "periodName", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateMealHistoryDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMealHistoryDto.prototype, "foodId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateMealHistoryDto.prototype, "amount", void 0);
__decorate([
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateMealHistoryDto.prototype, "isCompleted", void 0);
__decorate([
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateMealHistoryDto.prototype, "userId", void 0);
exports.CreateMealHistoryDto = CreateMealHistoryDto;
//# sourceMappingURL=createMealHistory.dto.js.map
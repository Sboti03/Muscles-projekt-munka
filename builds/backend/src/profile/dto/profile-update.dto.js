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
const class_validator_1 = require("class-validator");
const IsNullable_validation_1 = require("../../Common/utils/IsNullable.validation");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class ProfileUpdateDto {
}
__decorate([
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileUpdateDto.prototype, "firstName", void 0);
__decorate([
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileUpdateDto.prototype, "lastName", void 0);
__decorate([
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ProfileUpdateDto.prototype, "birthDay", void 0);
__decorate([
    (0, IsNullable_validation_1.IsUndefinable)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProfileUpdateDto.prototype, "height", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    (0, IsNullable_validation_1.IsUndefinable)(),
    __metadata("design:type", Boolean)
], ProfileUpdateDto.prototype, "male", void 0);
exports.default = ProfileUpdateDto;
//# sourceMappingURL=profile-update.dto.js.map
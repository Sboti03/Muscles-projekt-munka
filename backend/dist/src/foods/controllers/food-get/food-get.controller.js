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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodGetController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const food_get_service_1 = require("../../services/food-get/food-get.service");
const role_guard_1 = require("../../../auth/guards/role.guard");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../../Common/Role/utils/roles");
const id_param_1 = require("../../../Common/params/id.param");
let FoodGetController = class FoodGetController {
    constructor(foodGetService) {
        this.foodGetService = foodGetService;
    }
    async getAllFood() {
        return this.foodGetService.getAllFood();
    }
    async getFoodById(idParam) {
        return this.foodGetService.getFoodById(idParam.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FoodGetController.prototype, "getAllFood", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], FoodGetController.prototype, "getFoodById", null);
FoodGetController = __decorate([
    (0, common_1.Controller)('food'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    __metadata("design:paramtypes", [food_get_service_1.FoodGetService])
], FoodGetController);
exports.FoodGetController = FoodGetController;
//# sourceMappingURL=food-get.controller.js.map
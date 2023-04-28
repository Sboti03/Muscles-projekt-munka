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
exports.AdminFoodController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../../Common/Role/utils/roles");
const role_guard_1 = require("../../../auth/guards/role.guard");
const admin_food_service_1 = require("../../services/admin-food/admin-food.service");
const id_param_1 = require("../../../Common/params/id.param");
const food_check_service_1 = require("../../../foods/services/food-check/food-check.service");
const food_create_dto_1 = require("../../../foods/dto/food-create.dto");
const food_convert_service_1 = require("../../../foods/services/food-convert/food-convert.service");
const food_create_service_1 = require("../../../foods/services/food-create/food-create.service");
const food_update_dto_1 = require("../../../foods/dto/food-update.dto");
const food_update_service_1 = require("../../../foods/services/food-update/food-update.service");
let AdminFoodController = class AdminFoodController {
    constructor(adminFoodService, foodService, convertService, foodCreateService, foodUpdateService) {
        this.adminFoodService = adminFoodService;
        this.foodService = foodService;
        this.convertService = convertService;
        this.foodCreateService = foodCreateService;
        this.foodUpdateService = foodUpdateService;
    }
    deleteFood(idParam) {
        const isFoodExist = this.foodService.checkValidFood(idParam.id);
        if (!isFoodExist)
            throw new common_1.NotFoundException('No food found');
        const isFoodDeleted = this.foodService.isFoodDeleted(idParam.id);
        if (isFoodDeleted)
            throw new common_1.ImATeapotException('Food is deleted already');
        return this.adminFoodService.deleteFood(idParam.id);
    }
    unDeleteFood(idParam) {
        const isFoodExist = this.foodService.checkValidFood(idParam.id);
        if (!isFoodExist)
            throw new common_1.NotFoundException('No food found');
        const isFoodDeleted = this.foodService.isFoodDeleted(idParam.id);
        if (!isFoodDeleted)
            throw new common_1.ImATeapotException('Food is not deleted');
        return this.adminFoodService.unDeleteFood(idParam.id);
    }
    async createFood(foodCreateDto) {
        const isFoodExist = this.foodService.isFoodExistByName(foodCreateDto.name);
        if (isFoodExist)
            throw new common_1.NotFoundException(`Food already exist with this name ${foodCreateDto.name}`);
        const foodCreateInput = this.convertService.convertCreateDtoToInput(foodCreateDto);
        return this.foodCreateService.createFood(foodCreateInput);
    }
    async updateFoodById(idParam, foodUpdateDto) {
        const isFoodExist = this.foodService.checkValidFood(idParam.id);
        if (!isFoodExist)
            throw new common_1.NotFoundException('No food found');
        const foodUpdateInput = this.convertService.convertUpdateDtoToInput(foodUpdateDto);
        return this.foodUpdateService.updateFoodById(idParam.id, foodUpdateInput);
    }
};
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", void 0)
], AdminFoodController.prototype, "deleteFood", null);
__decorate([
    (0, common_1.Patch)('undelete/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", void 0)
], AdminFoodController.prototype, "unDeleteFood", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [food_create_dto_1.FoodCreateDto]),
    __metadata("design:returntype", Promise)
], AdminFoodController.prototype, "createFood", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, food_update_dto_1.FoodUpdateDto]),
    __metadata("design:returntype", Promise)
], AdminFoodController.prototype, "updateFoodById", null);
AdminFoodController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/food'),
    __metadata("design:paramtypes", [admin_food_service_1.AdminFoodService,
        food_check_service_1.FoodCheckService,
        food_convert_service_1.FoodConvertService,
        food_create_service_1.FoodCreateService,
        food_update_service_1.FoodUpdateService])
], AdminFoodController);
exports.AdminFoodController = AdminFoodController;
//# sourceMappingURL=admin-food.controller.js.map
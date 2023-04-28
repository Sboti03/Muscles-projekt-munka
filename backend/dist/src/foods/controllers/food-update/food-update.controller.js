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
exports.FoodUpdateController = void 0;
const common_1 = require("@nestjs/common");
const food_update_service_1 = require("../../services/food-update/food-update.service");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../../Common/Role/utils/roles");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const role_guard_1 = require("../../../auth/guards/role.guard");
const food_convert_service_1 = require("../../services/food-convert/food-convert.service");
let FoodUpdateController = class FoodUpdateController {
    constructor(foodUpdateService, foodConvertService) {
        this.foodUpdateService = foodUpdateService;
        this.foodConvertService = foodConvertService;
    }
};
FoodUpdateController = __decorate([
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('food'),
    __metadata("design:paramtypes", [food_update_service_1.FoodUpdateService,
        food_convert_service_1.FoodConvertService])
], FoodUpdateController);
exports.FoodUpdateController = FoodUpdateController;
//# sourceMappingURL=food-update.controller.js.map
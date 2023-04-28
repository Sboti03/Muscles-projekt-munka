"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodsModule = void 0;
const common_1 = require("@nestjs/common");
const food_get_controller_1 = require("./controllers/food-get/food-get.controller");
const food_update_controller_1 = require("./controllers/food-update/food-update.controller");
const food_create_controller_1 = require("./controllers/food-create/food-create.controller");
const food_delete_controller_1 = require("./controllers/food-delete/food-delete.controller");
const food_delete_service_1 = require("./services/food-delete/food-delete.service");
const food_create_service_1 = require("./services/food-create/food-create.service");
const food_check_service_1 = require("./services/food-check/food-check.service");
const food_update_service_1 = require("./services/food-update/food-update.service");
const food_get_service_1 = require("./services/food-get/food-get.service");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const access_token_guard_1 = require("../auth/guards/access-token.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const food_convert_service_1 = require("./services/food-convert/food-convert.service");
let FoodsModule = class FoodsModule {
};
FoodsModule = __decorate([
    (0, common_1.Module)({
        controllers: [food_get_controller_1.FoodGetController, food_update_controller_1.FoodUpdateController, food_create_controller_1.FoodCreateController, food_delete_controller_1.FoodDeleteController],
        providers: [
            food_delete_service_1.FoodDeleteService,
            food_get_service_1.FoodGetService,
            food_update_service_1.FoodUpdateService,
            food_check_service_1.FoodCheckService,
            food_create_service_1.FoodCreateService,
            prirsma_service_1.PrismaService,
            access_token_guard_1.AccessTokenGuard,
            role_guard_1.RolesGuard,
            food_convert_service_1.FoodConvertService,
        ],
        exports: [food_check_service_1.FoodCheckService, food_create_service_1.FoodCreateService, food_delete_service_1.FoodDeleteService,
            food_get_service_1.FoodGetService,
            food_update_service_1.FoodUpdateService,
            food_check_service_1.FoodCheckService,
            food_create_service_1.FoodCreateService, food_convert_service_1.FoodConvertService]
    })
], FoodsModule);
exports.FoodsModule = FoodsModule;
//# sourceMappingURL=foods.module.js.map
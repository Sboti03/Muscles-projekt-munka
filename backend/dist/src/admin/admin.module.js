"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_block_service_1 = require("./services/admin-block/admin-block.service");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const admin_user_controller_1 = require("./controllers/admin-user/admin-user.controller");
const admin_food_controller_1 = require("./controllers/admin-food/admin-food.controller");
const admin_food_service_1 = require("./services/admin-food/admin-food.service");
const foods_module_1 = require("../foods/foods.module");
const admin_profile_controller_1 = require("./controllers/admin-profile/admin-profile.controller");
const profile_get_service_1 = require("../profile/services/profile-get/profile-get.service");
const user_get_service_1 = require("../user/services/user-get/user-get.service");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [foods_module_1.FoodsModule],
        providers: [
            admin_block_service_1.AdminBlockService,
            prirsma_service_1.PrismaService,
            admin_food_service_1.AdminFoodService,
            profile_get_service_1.ProfileGetService,
            user_get_service_1.UserGetService
        ],
        controllers: [
            admin_user_controller_1.AdminUserController,
            admin_food_controller_1.AdminFoodController,
            admin_profile_controller_1.AdminProfileController,
        ],
        exports: [
            admin_block_service_1.AdminBlockService,
            prirsma_service_1.PrismaService,
        ]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map
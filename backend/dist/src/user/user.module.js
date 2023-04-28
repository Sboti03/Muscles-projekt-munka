"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controller/user.controller");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const user_get_service_1 = require("./services/user-get/user-get.service");
const user_check_service_1 = require("./services/user-check/user-check.service");
const user_update_service_1 = require("./services/user-update/user-update.service");
const user_create_service_1 = require("./services/user-create/user-create.service");
const user_delete_service_1 = require("./services/user-delete/user-delete.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prirsma_service_1.PrismaService,
            user_get_service_1.UserGetService,
            user_check_service_1.UserCheckService,
            user_update_service_1.UserUpdateService,
            user_create_service_1.UserCreateService,
            user_delete_service_1.UserDeleteService,
        ],
        controllers: [user_controller_1.UserController],
        exports: [
            prirsma_service_1.PrismaService,
            user_get_service_1.UserGetService,
            user_check_service_1.UserCheckService,
            user_update_service_1.UserUpdateService,
            user_create_service_1.UserCreateService,
            user_delete_service_1.UserDeleteService
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
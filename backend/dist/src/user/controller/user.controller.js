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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../Common/utils/prirsma.service");
const access_token_guard_1 = require("../../auth/guards/access-token.guard");
const role_guard_1 = require("../../auth/guards/role.guard");
const _roles_decorator_1 = require("../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../Common/Role/utils/roles");
const user_get_service_1 = require("../services/user-get/user-get.service");
let UserController = class UserController {
    async getAllUser() {
        return this.userGetService.getAllUser();
    }
    constructor(prismaService, userGetService) {
        this.prismaService = prismaService;
        this.userGetService = userGetService;
    }
};
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        user_get_service_1.UserGetService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
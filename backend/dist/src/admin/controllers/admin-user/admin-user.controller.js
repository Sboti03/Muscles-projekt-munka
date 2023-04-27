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
exports.AdminUserController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const admin_block_service_1 = require("../../services/admin-block/admin-block.service");
const roles_1 = require("../../../Common/Role/utils/roles");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const role_guard_1 = require("../../../auth/guards/role.guard");
const id_param_1 = require("../../../Common/params/id.param");
const user_get_service_1 = require("../../../user/services/user-get/user-get.service");
const swagger_1 = require("@nestjs/swagger");
let AdminUserController = class AdminUserController {
    constructor(adminBlockService, userGetService) {
        this.adminBlockService = adminBlockService;
        this.userGetService = userGetService;
    }
    async blockUserByUserId(idParam) {
        return this.adminBlockService.blockUserByUserId(idParam.id);
    }
    async deleteAllData(email) {
        common_1.Logger.log(`delete all data for ${email}`);
        try {
            return await this.adminBlockService.deleteAllUserData(email);
        }
        catch (e) {
            throw new common_1.NotFoundException('No user found');
        }
    }
    async unBlockUserById(idParam) {
        return this.adminBlockService.unblockUserById(idParam.id);
    }
    async getAllUser() {
        return this.userGetService.getAllUser();
    }
};
__decorate([
    (0, common_1.Delete)('/block/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "blockUserByUserId", null);
__decorate([
    (0, common_1.Delete)('delete-all/'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "deleteAllData", null);
__decorate([
    (0, common_1.Patch)('/unblock/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "unBlockUserById", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "getAllUser", null);
AdminUserController = __decorate([
    (0, swagger_1.ApiTags)('admin/user'),
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/user'),
    __metadata("design:paramtypes", [admin_block_service_1.AdminBlockService,
        user_get_service_1.UserGetService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=admin-user.controller.js.map
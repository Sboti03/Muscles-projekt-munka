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
const admin_delete_service_1 = require("../../services/admin-delete/admin-delete.service");
const roles_1 = require("../../../Common/Role/utils/roles");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const role_guard_1 = require("../../../auth/guards/role.guard");
const id_param_1 = require("../../../Common/params/id.param");
let AdminUserController = class AdminUserController {
    constructor(adminBlockService, adminDeleteService) {
        this.adminBlockService = adminBlockService;
        this.adminDeleteService = adminDeleteService;
    }
    async deleteUserByUserId(idParam) {
        return this.adminDeleteService.deleteUserByUserId(idParam.id);
    }
    async blockUserByUserId(id) {
        return this.adminBlockService.blockUserByUserId(id);
    }
};
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "deleteUserByUserId", null);
__decorate([
    (0, common_1.Patch)('/block'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminUserController.prototype, "blockUserByUserId", null);
AdminUserController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/user'),
    __metadata("design:paramtypes", [admin_block_service_1.AdminBlockService, admin_delete_service_1.AdminDeleteService])
], AdminUserController);
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=admin-user.controller.js.map
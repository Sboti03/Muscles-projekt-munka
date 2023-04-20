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
exports.AdminProfileController = void 0;
const common_1 = require("@nestjs/common");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../../Common/Role/utils/roles");
const role_guard_1 = require("../../../auth/guards/role.guard");
const id_param_1 = require("../../../Common/params/id.param");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const profile_get_service_1 = require("../../../profile/services/profile-get/profile-get.service");
const swagger_1 = require("@nestjs/swagger");
let AdminProfileController = class AdminProfileController {
    constructor(profileGetService) {
        this.profileGetService = profileGetService;
    }
    async getAllProfileAdminVersion() {
        return this.profileGetService.getAllProfileAllData();
    }
    async getAllProfileDataById(idParam) {
        return this.profileGetService.getAllProfileDataByProfileId(idParam.id);
    }
    async getAllProfile() {
        return this.profileGetService.getAllProfileAllData();
    }
};
__decorate([
    (0, common_1.Get)('admin/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminProfileController.prototype, "getAllProfileAdminVersion", null);
__decorate([
    (0, common_1.Get)('admin/id/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], AdminProfileController.prototype, "getAllProfileDataById", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminProfileController.prototype, "getAllProfile", null);
AdminProfileController = __decorate([
    (0, swagger_1.ApiTags)('admin/profile'),
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/profile'),
    __metadata("design:paramtypes", [profile_get_service_1.ProfileGetService])
], AdminProfileController);
exports.AdminProfileController = AdminProfileController;
//# sourceMappingURL=admin-profile.controller.js.map
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
exports.ProfileGetController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../auth/decorators/decorators");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const role_guard_1 = require("../../../auth/guards/role.guard");
const _roles_decorator_1 = require("../../../Common/Role/decorators/ roles.decorator");
const roles_1 = require("../../../Common/Role/utils/roles");
const profile_get_service_1 = require("../../services/profile-get/profile-get.service");
const id_param_1 = require("../../../Common/params/id.param");
let ProfileGetController = class ProfileGetController {
    constructor(profileGetService) {
        this.profileGetService = profileGetService;
    }
    async getAllProfileAdminVersion() {
        return this.profileGetService.getAllProfileAllData();
    }
    async getAllProfileDataById(idParam) {
        return this.profileGetService.getAllProfileDataByProfileId(idParam.id);
    }
    async getProfileData(profileId) {
        return this.profileGetService.getAllProfileDataByProfileId(profileId);
    }
    async getAllProfile() {
        return this.profileGetService.getAllProfileAllData();
    }
    async getProfileByName(name, role) {
        common_1.Logger.log(`Searching for ${name} [${role}]`);
        if (role === roles_1.RoleEnum.USER) {
            return this.profileGetService.getCoachProfiles(name);
        }
        else if (role === roles_1.RoleEnum.COACH) {
            return this.profileGetService.getUserProfiles(name);
        }
        else {
            return this.profileGetService.getProfileByName(name);
        }
    }
    async getProfileDataById(idParam) {
        common_1.Logger.log('Searching for ' + idParam.id);
        try {
            return await this.profileGetService.getProfileDataByProfileId(idParam.id);
        }
        catch (e) {
            throw new common_1.NotFoundException('No profile found');
        }
    }
};
__decorate([
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Get)('admin/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getAllProfileAdminVersion", null);
__decorate([
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Get)('admin/id/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getAllProfileDataById", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getProfileData", null);
__decorate([
    (0, _roles_decorator_1.Roles)(roles_1.RoleEnum.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getAllProfile", null);
__decorate([
    (0, common_1.Get)('search/name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, decorators_1.GetCurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getProfileByName", null);
__decorate([
    (0, common_1.Get)('search/id/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getProfileDataById", null);
ProfileGetController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_get_service_1.ProfileGetService])
], ProfileGetController);
exports.ProfileGetController = ProfileGetController;
//# sourceMappingURL=profile-get.controller.js.map
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
const roles_1 = require("../../../Common/Role/utils/roles");
const profile_get_service_1 = require("../../services/profile-get/profile-get.service");
const id_param_1 = require("../../../Common/params/id.param");
const swagger_1 = require("@nestjs/swagger");
let ProfileGetController = class ProfileGetController {
    constructor(profileGetService) {
        this.profileGetService = profileGetService;
    }
    async getProfileData(profileId) {
        return this.profileGetService.getAllProfileDataByProfileId(profileId);
    }
    async getProfileByName(name, role, profileId) {
        common_1.Logger.log(`Searching for ${name} profileId: ${profileId} [${role}]`);
        if (role === roles_1.RoleEnum.USER) {
            common_1.Logger.log(`Search for Coach`);
            return this.profileGetService.getProfiles(name, roles_1.RoleEnum.COACH, profileId);
        }
        else if (role === roles_1.RoleEnum.COACH) {
            common_1.Logger.log(`Search for user`);
            return this.profileGetService.getProfiles(name, roles_1.RoleEnum.USER, profileId);
        }
        else {
            return this.profileGetService.getAllProfilesByName(name);
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
    (0, common_1.Get)('/'),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileGetController.prototype, "getProfileData", null);
__decorate([
    (0, common_1.Get)('search/name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, decorators_1.GetCurrentUser)('role')),
    __param(2, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
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
    (0, swagger_1.ApiTags)('profile'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_get_service_1.ProfileGetService])
], ProfileGetController);
exports.ProfileGetController = ProfileGetController;
//# sourceMappingURL=profile-get.controller.js.map
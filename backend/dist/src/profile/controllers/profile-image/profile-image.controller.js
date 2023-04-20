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
exports.ProfileImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const image_store_1 = require("../../../Image/image-store");
const decorators_1 = require("../../../auth/decorators/decorators");
const id_param_1 = require("../../../Common/params/id.param");
const profile_image_service_1 = require("../../services/profile-image/profile-image.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const swagger_1 = require("@nestjs/swagger");
let ProfileImageController = class ProfileImageController {
    constructor(profileImageService) {
        this.profileImageService = profileImageService;
    }
    async uploadProfilePic(profileId, file) {
        return this.profileImageService.uploadProfileImage(profileId, file);
    }
    async deleteProfilePic(profileId) {
        return this.profileImageService.deleteProfilePic(profileId);
    }
    async getOwnProfilePicture(profileId, res) {
        common_1.Logger.log(profileId);
        const profilePicturePath = await this.profileImageService.getProfilePicturePathByProfileId(profileId);
        res.sendFile(profilePicturePath);
    }
    async getProfilePicById(idParam, res) {
        common_1.Logger.log(idParam.id);
        const profilePicturePath = await this.profileImageService.getProfilePicturePathByProfileId(idParam.id);
        res.sendFile(profilePicturePath);
    }
};
__decorate([
    (0, common_1.Post)('pic/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', image_store_1.saveImageToStorage)),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileImageController.prototype, "uploadProfilePic", null);
__decorate([
    (0, common_1.Delete)('pic'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfileImageController.prototype, "deleteProfilePic", null);
__decorate([
    (0, common_1.Get)('pic/me'),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProfileImageController.prototype, "getOwnProfilePicture", null);
__decorate([
    (0, common_1.Get)('pic/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, Object]),
    __metadata("design:returntype", Promise)
], ProfileImageController.prototype, "getProfilePicById", null);
ProfileImageController = __decorate([
    (0, swagger_1.ApiTags)('profile'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_image_service_1.ProfileImageService])
], ProfileImageController);
exports.ProfileImageController = ProfileImageController;
//# sourceMappingURL=profile-image.controller.js.map
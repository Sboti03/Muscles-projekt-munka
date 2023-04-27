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
exports.ProfileImageService = void 0;
const common_1 = require("@nestjs/common");
const profile_update_service_1 = require("../profile-update/profile-update.service");
const profile_check_service_1 = require("../profile-check/profile-check.service");
const image_service_1 = require("../../../Image/image.service");
const path_1 = require("path");
let ProfileImageService = class ProfileImageService {
    constructor(profileUpdateService, profileCheckService, imageService) {
        this.profileUpdateService = profileUpdateService;
        this.profileCheckService = profileCheckService;
        this.imageService = imageService;
    }
    async uploadProfileImage(profileId, file) {
        common_1.Logger.debug(`Uploading image profileId ${profileId} fileName: ${file === null || file === void 0 ? void 0 : file.filename}`);
        const fileName = file === null || file === void 0 ? void 0 : file.filename;
        if (!fileName) {
            throw new common_1.BadRequestException('File must be a png, jpg/jpeg');
        }
        const oldProfilePic = await this.imageService.getProfilePictureById(profileId);
        if (oldProfilePic) {
            common_1.Logger.debug(`Old picture filename: ${oldProfilePic}`);
            await this.imageService.deleteProfilePicture(profileId, oldProfilePic);
        }
        return this.imageService.setProfilePicturePath(profileId, file.filename);
    }
    async deleteProfilePic(profileId) {
        const oldProfilePic = await this.imageService.getProfilePictureById(profileId);
        if (!oldProfilePic) {
            throw new common_1.NotFoundException('No profile picture found');
        }
        await this.imageService.setDefaultProfilePicture(profileId);
        await this.imageService.deleteProfilePicture(profileId, oldProfilePic);
        return {};
    }
    async getProfilePicturePathByProfileId(profileId) {
        const isProfileExist = await this.profileCheckService.checkProfileByProfileId(profileId);
        common_1.Logger.log('Profile exists: ' + isProfileExist);
        if (!isProfileExist) {
            throw new common_1.NotFoundException('No profile found');
        }
        let profilePicturePath = await this.imageService.getProfilePictureById(profileId);
        common_1.Logger.log(profilePicturePath);
        if (profilePicturePath === '') {
            common_1.Logger.log(`No profile picture`);
            profilePicturePath = await this.imageService.getDefaultProfilePicture(profileId);
        }
        return (0, path_1.join)(process.cwd()) + '/images/' + profilePicturePath;
    }
};
ProfileImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_update_service_1.ProfileUpdateService,
        profile_check_service_1.ProfileCheckService,
        image_service_1.ImageService])
], ProfileImageService);
exports.ProfileImageService = ProfileImageService;
//# sourceMappingURL=profile-image.service.js.map
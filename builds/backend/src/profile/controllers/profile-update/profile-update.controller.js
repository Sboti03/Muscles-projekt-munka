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
exports.ProfileUpdateController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../auth/decorators/decorators");
const profile_create_service_1 = require("../../services/profile-create/profile-create.service");
const profile_update_dto_1 = require("../../dto/profile-update.dto");
const profile_update_service_1 = require("../../services/profile-update/profile-update.service");
const profile_convert_service_1 = require("../../services/profile-convert/profile-convert.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const swagger_1 = require("@nestjs/swagger");
let ProfileUpdateController = class ProfileUpdateController {
    constructor(profileCreateService, profileUpdateService, profileConvertService) {
        this.profileCreateService = profileCreateService;
        this.profileUpdateService = profileUpdateService;
        this.profileConvertService = profileConvertService;
    }
    async updateProfile(profileId, profileUpdateDto) {
        const profileUpdateInput = this.profileConvertService.convertProfileUpdateDtoToInput(profileUpdateDto);
        return this.profileUpdateService.updateProfile(profileId, profileUpdateInput);
    }
};
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, decorators_1.GetCurrentUserProfileId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, profile_update_dto_1.default]),
    __metadata("design:returntype", Promise)
], ProfileUpdateController.prototype, "updateProfile", null);
ProfileUpdateController = __decorate([
    (0, swagger_1.ApiTags)('profile'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_create_service_1.ProfileCreateService,
        profile_update_service_1.ProfileUpdateService,
        profile_convert_service_1.ProfileConvertService])
], ProfileUpdateController);
exports.ProfileUpdateController = ProfileUpdateController;
//# sourceMappingURL=profile-update.controller.js.map
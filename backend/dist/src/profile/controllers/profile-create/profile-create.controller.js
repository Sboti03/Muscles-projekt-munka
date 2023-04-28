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
exports.ProfileCreateController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../auth/decorators/decorators");
const profile_create_service_1 = require("../../services/profile-create/profile-create.service");
const profile_create_dto_1 = require("../../dto/profile-create.dto");
const profile_update_service_1 = require("../../services/profile-update/profile-update.service");
const profile_convert_service_1 = require("../../services/profile-convert/profile-convert.service");
const access_token_guard_1 = require("../../../auth/guards/access-token.guard");
const auth_token_service_1 = require("../../../auth/services/auth-token/auth-token.service");
let ProfileCreateController = class ProfileCreateController {
    constructor(profileCreateService, profileUpdateService, profileConvertService, authTokenService) {
        this.profileCreateService = profileCreateService;
        this.profileUpdateService = profileUpdateService;
        this.profileConvertService = profileConvertService;
        this.authTokenService = authTokenService;
    }
    async createProfile(userId, profileCreateDto) {
        const profileCreateInput = this.profileConvertService.convertProfileCreateDtoToInput(profileCreateDto, userId);
        const profile = await this.profileCreateService.createProfile(profileCreateInput);
        const newTokens = await this.authTokenService.getTokens(userId);
        return {
            profile,
            tokens: newTokens
        };
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, profile_create_dto_1.default]),
    __metadata("design:returntype", Promise)
], ProfileCreateController.prototype, "createProfile", null);
ProfileCreateController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_create_service_1.ProfileCreateService,
        profile_update_service_1.ProfileUpdateService,
        profile_convert_service_1.ProfileConvertService,
        auth_token_service_1.AuthTokenService])
], ProfileCreateController);
exports.ProfileCreateController = ProfileCreateController;
//# sourceMappingURL=profile-create.controller.js.map
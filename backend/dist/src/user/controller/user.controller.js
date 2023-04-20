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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../auth/guards/access-token.guard");
const user_get_service_1 = require("../services/user-get/user-get.service");
const id_param_1 = require("../../Common/params/id.param");
const profile_get_service_1 = require("../../profile/services/profile-get/profile-get.service");
const user_check_service_1 = require("../services/user-check/user-check.service");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userGetService, profileGetService, userCheckService) {
        this.userGetService = userGetService;
        this.profileGetService = profileGetService;
        this.userCheckService = userCheckService;
    }
    async getProfileByUserId(idParam) {
        const isUserExist = await this.userCheckService.checkUserById(idParam.id);
        if (!isUserExist) {
            throw new common_1.NotFoundException("No user found");
        }
        return this.profileGetService.getProfileIdByUserId(idParam.id);
    }
};
__decorate([
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfileByUserId", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_get_service_1.UserGetService,
        profile_get_service_1.ProfileGetService,
        user_check_service_1.UserCheckService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
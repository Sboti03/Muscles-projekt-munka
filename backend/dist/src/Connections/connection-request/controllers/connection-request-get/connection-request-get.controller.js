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
exports.ConnectionRequestGetController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../../auth/guards/access-token.guard");
const decorators_1 = require("../../../../auth/decorators/decorators");
const profile_guard_1 = require("../../../../auth/guards/profile.guard");
const connection_request_get_service_1 = require("../../services/connection-request-get/connection-request-get.service");
const swagger_1 = require("@nestjs/swagger");
let ConnectionRequestGetController = class ConnectionRequestGetController {
    constructor(getService) {
        this.getService = getService;
    }
    async createConnectionRequest(userId) {
        return this.getService.getAllByUserId(userId);
    }
};
__decorate([
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Get)('/all'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConnectionRequestGetController.prototype, "createConnectionRequest", null);
ConnectionRequestGetController = __decorate([
    (0, swagger_1.ApiTags)('connection-request'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('connection-request'),
    __metadata("design:paramtypes", [connection_request_get_service_1.ConnectionRequestGetService])
], ConnectionRequestGetController);
exports.ConnectionRequestGetController = ConnectionRequestGetController;
//# sourceMappingURL=connection-request-get.controller.js.map
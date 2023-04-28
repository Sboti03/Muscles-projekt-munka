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
exports.ConnectionCreateController = void 0;
const common_1 = require("@nestjs/common");
const id_param_1 = require("../../../../Common/params/id.param");
const decorators_1 = require("../../../../auth/decorators/decorators");
const connection_request_get_service_1 = require("../../../connection-request/services/connection-request-get/connection-request-get.service");
const connection_get_service_1 = require("../../services/connection-get/connection-get.service");
const roles_1 = require("../../../../Common/Role/utils/roles");
const connection_create_service_1 = require("../../services/connection-create/connection-create.service");
const access_token_guard_1 = require("../../../../auth/guards/access-token.guard");
const profile_guard_1 = require("../../../../auth/guards/profile.guard");
const profile_check_service_1 = require("../../../../profile/services/profile-check/profile-check.service");
const connection_check_service_1 = require("../../services/connection-check/connection-check.service");
const connection_request_check_service_1 = require("../../../connection-request/services/connection-request-check/connection-request-check.service");
let ConnectionCreateController = class ConnectionCreateController {
    constructor(connReqGetService, connGetService, connCreateService, profileCheckService, connCheckService, connReqCheckService) {
        this.connReqGetService = connReqGetService;
        this.connGetService = connGetService;
        this.connCreateService = connCreateService;
        this.profileCheckService = profileCheckService;
        this.connCheckService = connCheckService;
        this.connReqCheckService = connReqCheckService;
    }
    async acceptConnection(idParam, requesterId, requesterRole) {
        if (idParam.id === requesterId) {
            throw new common_1.ConflictException('Own id');
        }
        const { userId, coachId } = this.connReqGetService.getUserAndCoachId(idParam.id, requesterId, requesterRole);
        const otherId = requesterId === userId ? coachId : userId;
        const otherProfileExist = await this.profileCheckService.checkExistingProfileByUserId(otherId);
        if (!otherProfileExist) {
            throw new common_1.ConflictException('Other profile do not exists');
        }
        const isConnectionRequestExist = await this.connReqCheckService.checkExistingConnectionRequest(userId, coachId);
        if (!isConnectionRequestExist) {
            throw new common_1.NotFoundException('No connection request found');
        }
        const isConnectionExist = await this.connCheckService.checkExistingConnection(userId, coachId);
        if (isConnectionExist) {
            throw new common_1.ConflictException('Connection is already exists');
        }
        const { connectionRequestId, requestBy } = await this.connReqGetService.getConnectionRequestIdByIds(userId, coachId);
        if (requestBy === requesterId) {
            throw new common_1.ConflictException('Cannot accept own connection request');
        }
        try {
            return await this.connCreateService.createConnection(connectionRequestId);
        }
        catch (e) {
            throw new common_1.ConflictException('Unknown error :(');
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Post)('/accept'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, Number, String]),
    __metadata("design:returntype", Promise)
], ConnectionCreateController.prototype, "acceptConnection", null);
ConnectionCreateController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('connection'),
    __metadata("design:paramtypes", [connection_request_get_service_1.ConnectionRequestGetService,
        connection_get_service_1.ConnectionGetService,
        connection_create_service_1.ConnectionCreateService,
        profile_check_service_1.ProfileCheckService,
        connection_check_service_1.ConnectionCheckService,
        connection_request_check_service_1.ConnectionRequestCheckService])
], ConnectionCreateController);
exports.ConnectionCreateController = ConnectionCreateController;
//# sourceMappingURL=connection-create.controller.js.map
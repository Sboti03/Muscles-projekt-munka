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
const connection_check_service_1 = require("../../services/connection-check/connection-check.service");
const connection_request_check_service_1 = require("../../../connection-request/services/connection-request-check/connection-request-check.service");
const user_check_service_1 = require("../../../../user/services/user-check/user-check.service");
const swagger_1 = require("@nestjs/swagger");
let ConnectionCreateController = class ConnectionCreateController {
    constructor(connReqGetService, connGetService, connCreateService, connCheckService, connReqCheckService, userCheckService) {
        this.connReqGetService = connReqGetService;
        this.connGetService = connGetService;
        this.connCreateService = connCreateService;
        this.connCheckService = connCheckService;
        this.connReqCheckService = connReqCheckService;
        this.userCheckService = userCheckService;
    }
    async acceptConnection(idParam, requesterId, requesterRole) {
        if (idParam.id === requesterId) {
            throw new common_1.BadRequestException('Cannot accept own connection request');
        }
        const { userId, coachId } = this.connReqGetService.getUserAndCoachId(idParam.id, requesterId, requesterRole);
        const isConnectionRequestExist = await this.connReqCheckService.checkExistingConnectionRequest(userId, coachId);
        if (!isConnectionRequestExist) {
            throw new common_1.NotFoundException('No connection request found');
        }
        const isConnectionExist = await this.connCheckService.checkExistingConnection(userId, coachId);
        if (isConnectionExist) {
            throw new common_1.BadRequestException('Connection is already exists');
        }
        const isUserBlocked = await this.userCheckService.isUserBlocked(idParam.id);
        if (isUserBlocked) {
            throw new common_1.ForbiddenException("Other user is banned");
        }
        const { connectionRequestId, accessAll } = await this.connReqGetService.getConnectionRequestIdByIds(userId, coachId);
        if (accessAll) {
            const isAccessAllConnectionExist = await this.connCheckService.checkExistingAccessAllConnection(userId);
            if (isAccessAllConnectionExist) {
                throw new common_1.ForbiddenException("User already has a main coach");
            }
        }
        try {
            return await this.connCreateService.createConnection(connectionRequestId);
        }
        catch (e) {
            throw new common_1.BadRequestException('Unknown error :(');
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Post)('/accept/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, Number, String]),
    __metadata("design:returntype", Promise)
], ConnectionCreateController.prototype, "acceptConnection", null);
ConnectionCreateController = __decorate([
    (0, swagger_1.ApiTags)('connection'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('connection'),
    __metadata("design:paramtypes", [connection_request_get_service_1.ConnectionRequestGetService,
        connection_get_service_1.ConnectionGetService,
        connection_create_service_1.ConnectionCreateService,
        connection_check_service_1.ConnectionCheckService,
        connection_request_check_service_1.ConnectionRequestCheckService,
        user_check_service_1.UserCheckService])
], ConnectionCreateController);
exports.ConnectionCreateController = ConnectionCreateController;
//# sourceMappingURL=connection-create.controller.js.map
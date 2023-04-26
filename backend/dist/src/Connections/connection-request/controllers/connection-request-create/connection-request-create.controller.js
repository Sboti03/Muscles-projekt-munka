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
exports.ConnectionRequestCreateController = void 0;
const common_1 = require("@nestjs/common");
const access_token_guard_1 = require("../../../../auth/guards/access-token.guard");
const decorators_1 = require("../../../../auth/decorators/decorators");
const roles_1 = require("../../../../Common/Role/utils/roles");
const connection_request_get_service_1 = require("../../services/connection-request-get/connection-request-get.service");
const connection_request_check_service_1 = require("../../services/connection-request-check/connection-request-check.service");
const connection_request_create_service_1 = require("../../services/connection-request-create/connection-request-create.service");
const connection_check_service_1 = require("../../../connection/services/connection-check/connection-check.service");
const connection_request_dto_1 = require("../../data/connection-request.dto");
const user_check_service_1 = require("../../../../user/services/user-check/user-check.service");
const swagger_1 = require("@nestjs/swagger");
let ConnectionRequestCreateController = class ConnectionRequestCreateController {
    constructor(getService, checkService, createService, connectionCheckService, userCheckService) {
        this.getService = getService;
        this.checkService = checkService;
        this.createService = createService;
        this.connectionCheckService = connectionCheckService;
        this.userCheckService = userCheckService;
    }
    async createConnectionRequest(connectionRequestDto, requesterId, requesterRole) {
        if (connectionRequestDto.id === requesterId) {
            throw new common_1.BadRequestException("Same id");
        }
        const isSameRole = await this.checkService.isSameRole(connectionRequestDto.id, requesterId);
        if (isSameRole) {
            throw new common_1.BadRequestException("Same role");
        }
        const { userId, coachId } = this.getService.getUserAndCoachId(connectionRequestDto.id, requesterId, requesterRole);
        const isUserBlocked = await this.userCheckService.isUserBlocked(connectionRequestDto.id);
        if (isUserBlocked) {
            throw new common_1.ForbiddenException("Other user is banned");
        }
        const isConnectionExist = await this.connectionCheckService.checkExistingConnection(userId, coachId);
        if (isConnectionExist) {
            throw new common_1.BadRequestException("Existing connection");
        }
        const isConnectionRequestExist = await this.checkService.checkExistingConnectionRequest(userId, coachId);
        if (isConnectionRequestExist) {
            throw new common_1.BadRequestException("Existing connection request");
        }
        if (connectionRequestDto.accessAll) {
            const isAccessAllConnectionExit = await this.connectionCheckService.checkExistingAccessAllConnection(userId);
            if (isAccessAllConnectionExit) {
                throw new common_1.ForbiddenException("User already has a main coach");
            }
        }
        common_1.Logger.debug(`Creating connection request userId: ${userId} coachId: ${coachId}`);
        const createInput = this.getService.getConnectionRequestCreateInput(userId, requesterId, coachId, connectionRequestDto.accessAll);
        return this.createService.createConnectionRequest(createInput);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUser)("role")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connection_request_dto_1.default, Number, String]),
    __metadata("design:returntype", Promise)
], ConnectionRequestCreateController.prototype, "createConnectionRequest", null);
ConnectionRequestCreateController = __decorate([
    (0, swagger_1.ApiTags)('connection-request'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)("connection-request"),
    __metadata("design:paramtypes", [connection_request_get_service_1.ConnectionRequestGetService,
        connection_request_check_service_1.ConnectionRequestCheckService,
        connection_request_create_service_1.ConnectionRequestCreateService,
        connection_check_service_1.ConnectionCheckService,
        user_check_service_1.UserCheckService])
], ConnectionRequestCreateController);
exports.ConnectionRequestCreateController = ConnectionRequestCreateController;
//# sourceMappingURL=connection-request-create.controller.js.map
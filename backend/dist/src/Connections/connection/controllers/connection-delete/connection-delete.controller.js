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
exports.ConnectionDeleteController = void 0;
const common_1 = require("@nestjs/common");
const connection_request_get_service_1 = require("../../../connection-request/services/connection-request-get/connection-request-get.service");
const id_param_1 = require("../../../../Common/params/id.param");
const decorators_1 = require("../../../../auth/decorators/decorators");
const roles_1 = require("../../../../Common/Role/utils/roles");
const connection_check_service_1 = require("../../services/connection-check/connection-check.service");
const connection_delete_service_1 = require("../../services/connection-delete/connection-delete.service");
const access_token_guard_1 = require("../../../../auth/guards/access-token.guard");
const swagger_1 = require("@nestjs/swagger");
let ConnectionDeleteController = class ConnectionDeleteController {
    constructor(getService, checkService, deleteService) {
        this.getService = getService;
        this.checkService = checkService;
        this.deleteService = deleteService;
    }
    async deleteConnectionRequest(idParam, requesterId, requesterRole) {
        if (idParam.id === requesterId) {
            throw new common_1.ConflictException('Own id');
        }
        const { userId, coachId } = this.getService.getUserAndCoachId(idParam.id, requesterId, requesterRole);
        const isConnectionExists = await this.checkService.checkExistingConnection(userId, coachId);
        if (!isConnectionExists) {
            throw new common_1.ConflictException('No connection request found');
        }
        return this.deleteService.deleteConnection(userId, coachId);
    }
};
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, Number, String]),
    __metadata("design:returntype", Promise)
], ConnectionDeleteController.prototype, "deleteConnectionRequest", null);
ConnectionDeleteController = __decorate([
    (0, swagger_1.ApiTags)('connection'),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('connection'),
    __metadata("design:paramtypes", [connection_request_get_service_1.ConnectionRequestGetService,
        connection_check_service_1.ConnectionCheckService,
        connection_delete_service_1.ConnectionDeleteService])
], ConnectionDeleteController);
exports.ConnectionDeleteController = ConnectionDeleteController;
//# sourceMappingURL=connection-delete.controller.js.map
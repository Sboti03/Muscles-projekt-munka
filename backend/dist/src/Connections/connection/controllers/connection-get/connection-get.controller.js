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
exports.ConnectionGetController = void 0;
const common_1 = require("@nestjs/common");
const connection_get_service_1 = require("../../services/connection-get/connection-get.service");
const decorators_1 = require("../../../../auth/decorators/decorators");
const access_token_guard_1 = require("../../../../auth/guards/access-token.guard");
const id_param_1 = require("../../../../Common/params/id.param");
const roles_1 = require("../../../../Common/Role/utils/roles");
const connection_check_service_1 = require("../../services/connection-check/connection-check.service");
let ConnectionGetController = class ConnectionGetController {
    constructor(conGetService, connectionCheckService) {
        this.conGetService = conGetService;
        this.connectionCheckService = connectionCheckService;
    }
    async getAllConnection(userId) {
        return this.conGetService.getAllConnection(userId);
    }
    async getConnectionById(idParam, currentUserId, role) {
        const userId = role === roles_1.RoleEnum.USER ? currentUserId : idParam.id;
        const coachId = role === roles_1.RoleEnum.COACH ? currentUserId : idParam.id;
        if (await this.connectionCheckService.checkExistingConnection(userId, coachId)) {
            throw new common_1.NotFoundException('No connection found');
        }
        return this.conGetService.getUser(idParam.id);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConnectionGetController.prototype, "getAllConnection", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, decorators_1.GetCurrentUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_param_1.IdParam, Number, String]),
    __metadata("design:returntype", Promise)
], ConnectionGetController.prototype, "getConnectionById", null);
ConnectionGetController = __decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Controller)('connection'),
    __metadata("design:paramtypes", [connection_get_service_1.ConnectionGetService,
        connection_check_service_1.ConnectionCheckService])
], ConnectionGetController);
exports.ConnectionGetController = ConnectionGetController;
//# sourceMappingURL=connection-get.controller.js.map
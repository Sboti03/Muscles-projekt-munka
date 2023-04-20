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
exports.ConnectionRequestCheckService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../../Common/utils/prirsma.service");
const connection_request_get_service_1 = require("../connection-request-get/connection-request-get.service");
let ConnectionRequestCheckService = class ConnectionRequestCheckService {
    constructor(prismaService, getService) {
        this.prismaService = prismaService;
        this.getService = getService;
    }
    async checkExistingConnectionRequest(userId, coachId) {
        try {
            await this.getService.getConnectionRequestIdByIds(userId, coachId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async isSameRole(userId, userId2) {
        const { role: { roleId: user1Role } } = await this.prismaService.users.findUnique({
            where: { userId },
            select: { role: { select: { roleId: true } } }
        });
        const { role: { roleId: user2Role } } = await this.prismaService.users.findUnique({
            where: { userId: userId2 },
            select: { role: { select: { roleId: true } } }
        });
        return user1Role === user2Role;
    }
};
ConnectionRequestCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        connection_request_get_service_1.ConnectionRequestGetService])
], ConnectionRequestCheckService);
exports.ConnectionRequestCheckService = ConnectionRequestCheckService;
//# sourceMappingURL=connection-request-check.service.js.map
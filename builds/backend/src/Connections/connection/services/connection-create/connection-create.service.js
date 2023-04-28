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
exports.ConnectionCreateService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../../Common/utils/prirsma.service");
const connection_request_get_service_1 = require("../../../connection-request/services/connection-request-get/connection-request-get.service");
const connection_request_delete_service_1 = require("../../../connection-request/services/connection-request-delete/connection-request-delete.service");
let ConnectionCreateService = class ConnectionCreateService {
    constructor(prismaService, connectionRequestGetService, connectionRequestDeleteService) {
        this.prismaService = prismaService;
        this.connectionRequestGetService = connectionRequestGetService;
        this.connectionRequestDeleteService = connectionRequestDeleteService;
    }
    async createConnection(connectionRequestId) {
        const { userId, coachId, accessAll } = await this.connectionRequestGetService.getConnectionRequestById(connectionRequestId);
        await this.connectionRequestDeleteService.deleteConnection(userId, coachId);
        if (accessAll) {
            await this.prismaService.connectionRequest.deleteMany({
                where: {
                    userId,
                    accessAll: true
                }
            });
        }
        return this.prismaService.connections.create({
            data: this.createConnectionInput(userId, coachId, accessAll)
        });
    }
    createConnectionInput(userId, coachId, accessAll) {
        return {
            coach: { connect: { userId: coachId } },
            user: { connect: { userId } },
            accessAll: accessAll
        };
    }
};
ConnectionCreateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        connection_request_get_service_1.ConnectionRequestGetService,
        connection_request_delete_service_1.ConnectionRequestDeleteService])
], ConnectionCreateService);
exports.ConnectionCreateService = ConnectionCreateService;
//# sourceMappingURL=connection-create.service.js.map
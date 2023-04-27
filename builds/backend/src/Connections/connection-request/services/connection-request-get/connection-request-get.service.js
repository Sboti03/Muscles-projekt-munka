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
exports.ConnectionRequestGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../../Common/utils/prirsma.service");
const roles_1 = require("../../../../Common/Role/utils/roles");
let ConnectionRequestGetService = class ConnectionRequestGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getAllByUserId(userId) {
        return this.prismaService.connectionRequest.findMany({
            where: {
                OR: [
                    { userId },
                    { coachId: userId }
                ]
            },
        });
    }
    getConnectionRequestIdByIds(userId, coachId) {
        return this.prismaService.connectionRequest.findFirstOrThrow({
            where: {
                userId,
                coachId
            }
        });
    }
    getUserAndCoachId(id, requesterId, requesterRole) {
        const isRequesterUser = requesterRole === roles_1.RoleEnum.USER;
        const userId = isRequesterUser ? requesterId : id;
        const coachId = isRequesterUser ? id : requesterId;
        return { userId, coachId };
    }
    getConnectionRequestCreateInput(userId, requesterId, coachId, accessAll) {
        return {
            coach: { connect: { userId: coachId } },
            user: { connect: { userId } },
            accessAll: accessAll,
            requestBy: requesterId,
        };
    }
    getConnectionRequestById(connectionRequestId) {
        return this.prismaService.connectionRequest.findUniqueOrThrow({
            where: {
                connectionRequestId: connectionRequestId
            }
        });
    }
};
ConnectionRequestGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], ConnectionRequestGetService);
exports.ConnectionRequestGetService = ConnectionRequestGetService;
//# sourceMappingURL=connection-request-get.service.js.map
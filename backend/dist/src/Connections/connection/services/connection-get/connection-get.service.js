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
exports.ConnectionGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../../Common/utils/prirsma.service");
let ConnectionGetService = class ConnectionGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getConnectionByIds(userId, coachId) {
        return this.prismaService.connections.findUniqueOrThrow({
            where: {
                userId_coachId: { userId, coachId }
            },
        });
    }
    getAccessAllConnection(userId) {
        return this.prismaService.connections.findFirstOrThrow({
            where: {
                userId,
                accessAll: true
            }
        });
    }
    getAllConnection(id) {
        return this.prismaService.connections.findMany({
            where: {
                OR: [
                    { userId: id },
                    { coachId: id }
                ]
            },
            select: {
                userId: true,
                accessAll: true,
                coachId: true,
                connectionId: true,
            }
        });
    }
    getUser(id) {
        return this.prismaService.users.findFirstOrThrow({
            where: {
                userId: id
            },
            select: {
                userId: true,
                email: true,
                profileData: {
                    select: {
                        firstName: true,
                        lastName: true,
                        height: true,
                        birthDay: true,
                        registrationDate: true,
                    }
                }
            }
        });
    }
};
ConnectionGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], ConnectionGetService);
exports.ConnectionGetService = ConnectionGetService;
//# sourceMappingURL=connection-get.service.js.map
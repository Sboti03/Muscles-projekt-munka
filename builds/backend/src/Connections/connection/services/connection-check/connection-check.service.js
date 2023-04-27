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
exports.ConnectionCheckService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../../Common/utils/prirsma.service");
const connection_get_service_1 = require("../connection-get/connection-get.service");
let ConnectionCheckService = class ConnectionCheckService {
    constructor(prismaService, getService) {
        this.prismaService = prismaService;
        this.getService = getService;
    }
    async checkExistingConnection(userId, coachId) {
        try {
            await this.getService.getConnectionByIds(userId, coachId);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async checkExistingAccessAllConnection(userId) {
        try {
            await this.getService.getAccessAllConnection(userId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async checkAccessCoachToUser(userId, coachId) {
        try {
            const res = await this.getService.getConnectionByIds(userId, coachId);
            return res.accessAll;
        }
        catch (e) {
            return false;
        }
    }
    async validateConnection(userProfileId, coachProfileId) {
        if (await this.checkAccessCoachToUser(userProfileId, coachProfileId)) {
            throw new common_1.NotFoundException("No connetion found");
        }
        return undefined;
    }
};
ConnectionCheckService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        connection_get_service_1.ConnectionGetService])
], ConnectionCheckService);
exports.ConnectionCheckService = ConnectionCheckService;
//# sourceMappingURL=connection-check.service.js.map
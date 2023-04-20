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
exports.GoalsGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
let GoalsGetService = class GoalsGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getGoalsByProfileId(profileId) {
        return this.prismaService.goals.findFirst({
            orderBy: {
                date: 'desc'
            },
            where: {
                profileId,
            }
        });
    }
    async getGoalByProfileIdAndDate(profileId, date) {
        try {
            return await this.prismaService.goals.findFirstOrThrow({
                where: {
                    profileId: profileId,
                    date: {
                        lte: date
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });
        }
        catch (e) {
            return this.prismaService.goals.findFirst({
                where: {
                    profileId: profileId
                },
                orderBy: {
                    date: 'asc'
                }
            });
        }
    }
};
GoalsGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], GoalsGetService);
exports.GoalsGetService = GoalsGetService;
//# sourceMappingURL=goals-get.service.js.map
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
exports.DayHistoryCreateService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
let DayHistoryCreateService = class DayHistoryCreateService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createDayHistory(profileId, date) {
        return this.prismaService.dayHistory.create({
            data: {
                profileData: {
                    connect: {
                        profileId: profileId,
                    },
                },
                date: date,
            },
            select: {
                dayId: true,
            }
        });
    }
    async commentDayHistory(userId, date, comment) {
        const { profileId } = await this.prismaService.profileData.findUnique({
            where: { userId },
            select: { profileId: true }
        });
        return this.prismaService.dayHistory.upsert({
            where: {
                date_profileId: {
                    date,
                    profileId
                },
            },
            create: {
                date,
                profileId,
                comment,
            },
            update: {
                comment
            }
        });
    }
};
DayHistoryCreateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], DayHistoryCreateService);
exports.DayHistoryCreateService = DayHistoryCreateService;
//# sourceMappingURL=day-history-create.service.js.map
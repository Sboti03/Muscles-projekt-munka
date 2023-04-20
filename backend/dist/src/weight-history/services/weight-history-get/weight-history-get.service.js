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
exports.WeightHistoryGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
let WeightHistoryGetService = class WeightHistoryGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getWeightFromDate(date, profileId) {
        const request = this.prismaService.weightHistory.findFirstOrThrow({
            where: {
                day: {
                    profileId: profileId,
                    date: {
                        lte: date
                    }
                },
            },
            orderBy: {
                day: {
                    date: 'desc'
                }
            },
            select: {
                weight: true,
                day: {
                    select: {
                        date: true,
                    }
                }
            }
        });
        try {
            return await request;
        }
        catch (e) {
            return { weight: undefined, day: { date: undefined } };
        }
    }
};
WeightHistoryGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], WeightHistoryGetService);
exports.WeightHistoryGetService = WeightHistoryGetService;
//# sourceMappingURL=weight-history-get.service.js.map
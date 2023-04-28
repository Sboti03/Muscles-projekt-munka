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
exports.DayHistoryGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
let DayHistoryGetService = class DayHistoryGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getDayIdByDate(searchedDate, profileId) {
        return this.prismaService.dayHistory.findFirstOrThrow({
            select: { dayId: true },
            where: { date: searchedDate, profileId: profileId }
        });
    }
    getWeightByDayId(dayId) {
        return this.prismaService.dayHistory.findUnique({
            where: {
                dayId,
            },
            select: {
                weightHistory: {
                    select: {
                        weight: true,
                    }
                }
            }
        });
    }
    getAllWeight(profileId) {
        return this.prismaService.dayHistory.findMany({
            where: {
                profileId
            },
            select: {
                date: true,
                weightHistory: {
                    select: {
                        weight: true
                    }
                }
            }
        });
    }
    getLatestDayId(from) {
        return this.prismaService.dayHistory.findFirst({
            where: {
                date: {
                    lte: from
                }
            },
            orderBy: {
                date: 'desc',
            },
            select: {
                date: true,
                dayId: true,
            },
        });
    }
    getAllMealHistoryByIds(dayId, periodName) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId,
                periodName: periodName.valueOf()
            },
            select: {
                meal: {
                    select: {
                        amount: true,
                        addedBy: true,
                        completed: true,
                        food: true,
                    },
                },
                mealHistoryId: true
            }
        });
    }
};
DayHistoryGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], DayHistoryGetService);
exports.DayHistoryGetService = DayHistoryGetService;
//# sourceMappingURL=day-history-get.service.js.map
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
exports.MealHistoryGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const day_history_check_service_1 = require("../../../day-history/services/day-history-check/day-history-check.service");
const day_history_get_service_1 = require("../../../day-history/services/day-history-get/day-history-get.service");
const goals_get_service_1 = require("../../../goals/services/goals-get/goals-get.service");
const weight_history_get_service_1 = require("../../../weight-history/services/weight-history-get/weight-history-get.service");
const roles_1 = require("../../../Common/Role/utils/roles");
const connection_check_service_1 = require("../../../Connections/connection/services/connection-check/connection-check.service");
const profile_get_service_1 = require("../../../profile/services/profile-get/profile-get.service");
let MealHistoryGetService = class MealHistoryGetService {
    constructor(prismaService, dayHistoryCheckService, dayHistoryGetService, goalsGetService, weightHistoryGetService, connectionCheckService, profileGetService) {
        this.prismaService = prismaService;
        this.dayHistoryCheckService = dayHistoryCheckService;
        this.dayHistoryGetService = dayHistoryGetService;
        this.goalsGetService = goalsGetService;
        this.weightHistoryGetService = weightHistoryGetService;
        this.connectionCheckService = connectionCheckService;
        this.profileGetService = profileGetService;
    }
    getMealHistoryMealId(dayId, periodName, foodId) {
        return this.prismaService.mealHistory.findFirstOrThrow({
            where: {
                dayId,
                periodName,
                meal: {
                    foodId
                }
            },
            select: {
                mealId: true
            }
        });
    }
    getMealHistoryById(mealHistoryId) {
        return this.prismaService.mealHistory.findUniqueOrThrow({
            where: {
                mealHistoryId
            }
        });
    }
    getProfileIdByMealHistoryId(mealHistoryId) {
        return this.prismaService.mealHistory.findFirstOrThrow({
            where: {
                mealHistoryId
            },
            select: {
                day: {
                    select: {
                        profileId: true
                    }
                }
            },
        });
    }
    getMealIdByMealHistoryId(mealHistoryId) {
        return this.prismaService.mealHistory.findFirst({
            where: {
                mealHistoryId
            },
            select: {
                mealId: true
            }
        });
    }
    getAllMealHistory(dayId, periodName) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId,
                periodName: periodName.valueOf()
            },
            include: {
                meal: {
                    include: {
                        food: {
                            include: {
                                unit: true
                            }
                        },
                    }
                },
            },
        });
    }
    getAllMealDataByDayId(dayId) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId
            },
            select: {
                meal: {
                    select: {
                        amount: true,
                        food: {
                            select: {
                                perUnit: true,
                                fat: true,
                                fiber: true,
                                protein: true,
                                sugar: true,
                                carbohydrate: true,
                                kcal: true
                            }
                        }
                    }
                }
            }
        });
    }
    getAllMealId(dayId, periodName) {
        return this.prismaService.mealHistory.findMany({
            select: {
                mealId: true
            },
            where: {
                periodName,
                dayId
            }
        });
    }
    getAllMeal(dayId, periodName) {
        return this.prismaService.mealHistory.findMany({
            where: {
                dayId,
                periodName
            },
            include: {
                meal: {
                    include: {
                        food: {
                            include: {
                                unit: true,
                            }
                        }
                    }
                },
            }
        });
    }
    async getDayHistoryData(currentUserId, date, id, currentProfileId, role) {
        let profileId = currentProfileId;
        if (id) {
            if (id === currentProfileId) {
                throw new common_1.BadRequestException('Own id');
            }
            const userId = role === roles_1.RoleEnum.USER ? currentUserId : id;
            const coachId = role === roles_1.RoleEnum.COACH ? currentUserId : id;
            if (userId === currentUserId) {
                throw new common_1.BadRequestException('Access denied');
            }
            const isConnectionExist = await this.connectionCheckService.checkExistingConnection(userId, coachId);
            if (!isConnectionExist) {
                throw new common_1.NotFoundException('No connection found');
            }
            profileId = (await this.profileGetService.getProfileIdByUserId(userId)).profileId;
        }
        let dayHistory;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, date);
        if (!isDayHistoryExist) {
            dayHistory = [];
        }
        else {
            const { dayId } = await this.dayHistoryGetService.getDayIdByDate(date, profileId);
            dayHistory = await this.getAllMealDataByDayId(dayId);
        }
        const goal = await this.goalsGetService.getGoalByProfileIdAndDate(profileId, date);
        const { weight, day: { date: weightDate } } = await this.weightHistoryGetService.getWeightFromDate(date, profileId);
        return {
            dayHistory: dayHistory,
            goal,
            weight: { weight, weightDate }
        };
    }
};
MealHistoryGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        day_history_check_service_1.DayHistoryCheckService,
        day_history_get_service_1.DayHistoryGetService,
        goals_get_service_1.GoalsGetService,
        weight_history_get_service_1.WeightHistoryGetService,
        connection_check_service_1.ConnectionCheckService,
        profile_get_service_1.ProfileGetService])
], MealHistoryGetService);
exports.MealHistoryGetService = MealHistoryGetService;
//# sourceMappingURL=meal-history-get.service.js.map
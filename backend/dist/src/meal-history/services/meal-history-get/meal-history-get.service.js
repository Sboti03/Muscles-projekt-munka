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
const connection_check_service_1 = require("../../../Connections/connection/services/connection-check/connection-check.service");
const profile_get_service_1 = require("../../../profile/services/profile-get/profile-get.service");
const connection_get_service_1 = require("../../../Connections/connection/services/connection-get/connection-get.service");
let MealHistoryGetService = class MealHistoryGetService {
    constructor(prismaService, dayHistoryCheckService, dayHistoryGetService, goalsGetService, weightHistoryGetService, connectionCheckService, profileGetService, connectionGetService) {
        this.prismaService = prismaService;
        this.dayHistoryCheckService = dayHistoryCheckService;
        this.dayHistoryGetService = dayHistoryGetService;
        this.goalsGetService = goalsGetService;
        this.weightHistoryGetService = weightHistoryGetService;
        this.connectionCheckService = connectionCheckService;
        this.profileGetService = profileGetService;
        this.connectionGetService = connectionGetService;
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
            }
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
                        }
                    }
                }
            }
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
                        addedBy: true,
                        amount: true,
                        completed: true,
                        food: {
                            select: {
                                perUnit: true,
                                fat: true,
                                fiber: true,
                                protein: true,
                                sugar: true,
                                carbohydrate: true,
                                kcal: true,
                                unit: true
                            },
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
                                unit: true
                            }
                        }
                    }
                }
            }
        });
    }
    async getMealHistoryData(requesterId, date, userId, currentProfileId) {
        let profileId = currentProfileId;
        if (userId) {
            await this.validateRequest(userId, requesterId);
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
    async getMealHistory(dayHistoryGetDto, currentProfileId, currentUserId) {
        let profileId = currentProfileId;
        if (dayHistoryGetDto.userId) {
            await this.validateRequest(dayHistoryGetDto.userId, currentUserId);
            profileId = (await this.profileGetService.getProfileIdByUserId(dayHistoryGetDto.userId)).profileId;
        }
        const { date, periodName } = dayHistoryGetDto;
        const isDayHistoryExist = await this.dayHistoryCheckService.checkExistingDayHistory(profileId, date);
        if (!isDayHistoryExist) {
            return [];
        }
        const { dayId } = await this.dayHistoryGetService.getDayIdByDate(date, profileId);
        return this.dayHistoryGetService.getAllMealHistoryByIds(dayId, periodName);
    }
    async validateRequest(userId, requesterId) {
        if (userId === requesterId) {
            throw new common_1.BadRequestException("Own id");
        }
        const isConnectionExist = await this.connectionCheckService.checkAccessCoachToUser(userId, requesterId);
        if (!isConnectionExist) {
            throw new common_1.NotFoundException("No connection found");
        }
        const connection = await this.connectionGetService.getConnectionByIds(userId, requesterId);
        if (connection.userId !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        return true;
    }
    async getMealHistoryBetween(requesterUserId, requesterProfileId, from, to, userId) {
        let profileId = requesterProfileId;
        if (userId) {
            await this.validateRequest(userId, requesterUserId);
            profileId = (await this.profileGetService.getProfileIdByUserId(userId)).profileId;
        }
        return this.prismaService.dayHistory.findMany({
            where: {
                profileId,
                date: {
                    lte: to,
                    gte: from
                }
            },
            select: {
                date: true,
                weightHistory: {
                    select: {
                        weight: true
                    }
                },
                mealHistory: {
                    select: {
                        periodName: true,
                        meal: {
                            select: {
                                addedBy: true,
                                completed: true,
                                amount: true,
                                food: {
                                    select: {
                                        unit: {
                                            select: {
                                                unit: true,
                                                defaultValue: true
                                            }
                                        },
                                        kcal: true,
                                        fat: true,
                                        fiber: true,
                                        sugar: true,
                                        foodId: true,
                                        protein: true,
                                        carbohydrate: true,
                                        name: true,
                                        perUnit: true,
                                    },
                                },
                            },
                        },
                    },
                },
            }
        });
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
        profile_get_service_1.ProfileGetService,
        connection_get_service_1.ConnectionGetService])
], MealHistoryGetService);
exports.MealHistoryGetService = MealHistoryGetService;
//# sourceMappingURL=meal-history-get.service.js.map
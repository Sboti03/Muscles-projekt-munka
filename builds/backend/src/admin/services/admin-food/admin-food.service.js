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
exports.AdminFoodService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
const food_get_service_1 = require("../../../foods/services/food-get/food-get.service");
const food_check_service_1 = require("../../../foods/services/food-check/food-check.service");
let AdminFoodService = class AdminFoodService {
    constructor(prismaService, foodGetService, foodCheckService) {
        this.prismaService = prismaService;
        this.foodGetService = foodGetService;
        this.foodCheckService = foodCheckService;
    }
    deleteFood(foodId) {
        return this.prismaService.foods.update({
            where: {
                foodId
            },
            data: { isDeleted: true }
        });
    }
    unDeleteFood(foodId) {
        return this.prismaService.foods.update({
            where: {
                foodId
            },
            data: { isDeleted: false }
        });
    }
    getAllActiveFood() {
        return this.foodGetService.getAllActiveFood();
    }
    getAllFood(searchFoodQuery) {
        return this.foodGetService.getAllFood(searchFoodQuery);
    }
    async getFoodById(foodId) {
        const isFoodExist = await this.foodCheckService.checkValidFood(foodId);
        if (!isFoodExist) {
            throw new common_1.NotFoundException("No food found");
        }
        return this.foodGetService.getFoodById(foodId);
    }
};
AdminFoodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService,
        food_get_service_1.FoodGetService,
        food_check_service_1.FoodCheckService])
], AdminFoodService);
exports.AdminFoodService = AdminFoodService;
//# sourceMappingURL=admin-food.service.js.map
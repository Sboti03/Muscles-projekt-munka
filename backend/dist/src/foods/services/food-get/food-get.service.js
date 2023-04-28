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
exports.FoodGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
let FoodGetService = class FoodGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getFoodById(foodId) {
        return this.prismaService.foods.findUnique({
            where: {
                foodId
            },
            include: {
                unit: true
            }
        });
    }
    getAllFood() {
        return this.prismaService.foods.findMany({
            where: {
                isDeleted: false
            },
            include: {
                unit: true
            }
        });
    }
};
FoodGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], FoodGetService);
exports.FoodGetService = FoodGetService;
//# sourceMappingURL=food-get.service.js.map
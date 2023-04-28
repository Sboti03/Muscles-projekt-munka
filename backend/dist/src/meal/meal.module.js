"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealModule = void 0;
const common_1 = require("@nestjs/common");
const meal_create_service_1 = require("./services/meal-create/meal-create.service");
const meal_controller_1 = require("./controller/meal.controller");
const meal_update_service_1 = require("./services/meal-update/meal-update.service");
const meal_delete_service_1 = require("./services/meal-delete/meal-delete.service");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const meal_get_service_1 = require("./services/meal-get/meal-get.service");
let MealModule = class MealModule {
};
MealModule = __decorate([
    (0, common_1.Module)({
        providers: [
            meal_create_service_1.MealCreateService,
            meal_get_service_1.MealGetService,
            meal_update_service_1.MealUpdateService,
            meal_delete_service_1.MealDeleteService,
            prirsma_service_1.PrismaService,
        ],
        exports: [
            prirsma_service_1.PrismaService,
            meal_create_service_1.MealCreateService,
            meal_get_service_1.MealGetService,
            meal_update_service_1.MealUpdateService,
            meal_delete_service_1.MealDeleteService,
            meal_create_service_1.MealCreateService,
        ],
        controllers: [meal_controller_1.MealController]
    })
], MealModule);
exports.MealModule = MealModule;
//# sourceMappingURL=meal.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const meal_history_create_service_1 = require("./services/meal-history-create/meal-history-create.service");
const meal_history_convert_service_1 = require("./services/meal-history-convert/meal-history-convert.service");
const meal_history_get_service_1 = require("./services/meal-history-get/meal-history-get.service");
const meal_history_get_controller_1 = require("./controllers/meal-history-get/meal-history-get.controller");
const meal_history_create_controller_1 = require("./controllers/meal-history-create/meal-history-create.controller");
const meal_history_update_controller_1 = require("./controllers/meal-history-update/meal-history-update.controller");
const day_history_module_1 = require("../day-history/day-history.module");
const meal_module_1 = require("../meal/meal.module");
const meal_history_delete_controller_1 = require("./controllers/meal-history-delete/meal-history-delete.controller");
const meal_history_delete_service_1 = require("./services/meal-history-delete/meal-history-delete.service");
const meal_history_check_service_1 = require("./services/meal-history-check/meal-history-check.service");
const weight_history_module_1 = require("../weight-history/weight-history.module");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const day_history_get_service_1 = require("../day-history/services/day-history-get/day-history-get.service");
const day_history_create_service_1 = require("../day-history/services/day-history-create/day-history-create.service");
const goals_module_1 = require("../goals/goals.module");
const foods_module_1 = require("../foods/foods.module");
const connection_module_1 = require("../Connections/connection/connection.module");
const profile_module_1 = require("../profile/profile.module");
let MealHistoryModule = class MealHistoryModule {
};
MealHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [meal_module_1.MealModule, day_history_module_1.DayHistoryModule, profile_module_1.ProfileModule, goals_module_1.GoalsModule, weight_history_module_1.WeightHistoryModule, foods_module_1.FoodsModule, connection_module_1.ConnectionModule, connection_module_1.ConnectionModule],
        controllers: [meal_history_get_controller_1.MealHistoryGetController, meal_history_create_controller_1.MealHistoryCreateController, meal_history_update_controller_1.MealHistoryUpdateController, meal_history_delete_controller_1.MealHistoryDeleteController],
        providers: [
            meal_history_create_service_1.MealHistoryCreateService,
            prirsma_service_1.PrismaService,
            day_history_get_service_1.DayHistoryGetService,
            day_history_create_service_1.DayHistoryCreateService,
            meal_history_convert_service_1.MealHistoryConvertService,
            meal_history_get_service_1.MealHistoryGetService,
            meal_history_delete_service_1.MealHistoryDeleteService,
            meal_history_check_service_1.MealHistoryCheckService,
        ],
        exports: [
            meal_history_create_service_1.MealHistoryCreateService,
            meal_history_convert_service_1.MealHistoryConvertService,
            meal_history_get_service_1.MealHistoryGetService,
            meal_history_delete_service_1.MealHistoryDeleteService,
        ],
    })
], MealHistoryModule);
exports.MealHistoryModule = MealHistoryModule;
//# sourceMappingURL=meal-history.module.js.map
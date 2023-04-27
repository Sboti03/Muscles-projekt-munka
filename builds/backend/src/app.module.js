"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const profile_module_1 = require("./profile/profile.module");
const day_history_module_1 = require("./day-history/day-history.module");
const foods_module_1 = require("./foods/foods.module");
const weight_history_module_1 = require("./weight-history/weight-history.module");
const goals_module_1 = require("./goals/goals.module");
const connection_request_module_1 = require("./Connections/connection-request/connection-request.module");
const connection_module_1 = require("./Connections/connection/connection.module");
const admin_module_1 = require("./admin/admin.module");
const meal_history_module_1 = require("./meal-history/meal-history.module");
const process = require("process");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client'),
                exclude: ['/api/(.*)'],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.${process.env.NODE_ENV}.env`
            }),
            day_history_module_1.DayHistoryModule,
            foods_module_1.FoodsModule,
            weight_history_module_1.WeightHistoryModule,
            goals_module_1.GoalsModule,
            connection_request_module_1.ConnectionRequestModule,
            connection_module_1.ConnectionModule,
            admin_module_1.AdminModule,
            meal_history_module_1.MealHistoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
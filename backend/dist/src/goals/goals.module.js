"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsModule = void 0;
const common_1 = require("@nestjs/common");
const goals_update_service_1 = require("./services/goals-update/goals-update.service");
const goals_get_service_1 = require("./services/goals-get/goals-get.service");
const goals_convert_service_1 = require("./services/goals-convert/goals-convert.service");
const goals_update_controller_1 = require("./controllers/goals-update/goals-update.controller");
const goals_get_controller_1 = require("./controllers/goals-get/goals-get.controller");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const goals_check_service_1 = require("./services/goals-check/goals-check.service");
let GoalsModule = class GoalsModule {
};
GoalsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            goals_update_controller_1.GoalsUpdateController,
            goals_get_controller_1.GoalsGetController
        ],
        providers: [
            goals_get_service_1.GoalsGetService,
            goals_update_service_1.GoalsUpdateService,
            goals_convert_service_1.GoalsConvertService,
            prirsma_service_1.PrismaService,
            goals_check_service_1.GoalsCheckService
        ],
        exports: [
            goals_get_service_1.GoalsGetService,
            goals_update_service_1.GoalsUpdateService,
            goals_convert_service_1.GoalsConvertService,
            prirsma_service_1.PrismaService,
            goals_check_service_1.GoalsCheckService
        ]
    })
], GoalsModule);
exports.GoalsModule = GoalsModule;
//# sourceMappingURL=goals.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const weight_history_update_or_create_service_1 = require("./services/weight-history-update-or-create/weight-history-update-or-create.service");
const weight_history_controller_1 = require("./controller/weight-history-create-or-update/weight-history.controller");
const day_history_get_service_1 = require("../day-history/services/day-history-get/day-history-get.service");
const day_history_create_service_1 = require("../day-history/services/day-history-create/day-history-create.service");
const weight_history_get_service_1 = require("./services/weight-history-get/weight-history-get.service");
const weight_history_get_controller_1 = require("./controller/weight-history-get/weight-history-get.controller");
const connection_check_service_1 = require("../Connections/connection/services/connection-check/connection-check.service");
const connection_get_service_1 = require("../Connections/connection/services/connection-get/connection-get.service");
let WeightHistoryModule = class WeightHistoryModule {
};
WeightHistoryModule = __decorate([
    (0, common_1.Module)({
        providers: [
            weight_history_update_or_create_service_1.WeightHistoryUpdateOrCreateService,
            prirsma_service_1.PrismaService,
            day_history_get_service_1.DayHistoryGetService,
            connection_check_service_1.ConnectionCheckService,
            connection_get_service_1.ConnectionGetService,
            day_history_create_service_1.DayHistoryCreateService,
            weight_history_get_service_1.WeightHistoryGetService,
        ],
        controllers: [weight_history_controller_1.WeightHistoryController, weight_history_get_controller_1.WeightHistoryGetController],
        exports: [
            weight_history_update_or_create_service_1.WeightHistoryUpdateOrCreateService,
            prirsma_service_1.PrismaService,
            weight_history_get_service_1.WeightHistoryGetService
        ]
    })
], WeightHistoryModule);
exports.WeightHistoryModule = WeightHistoryModule;
//# sourceMappingURL=weight-history.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const day_history_create_service_1 = require("./services/day-history-create/day-history-create.service");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const day_history_get_service_1 = require("./services/day-history-get/day-history-get.service");
const day_history_get_controller_1 = require("./controllers/day-history-get/day-history-get.controller");
const day_history_check_service_1 = require("./services/day-history-check/day-history-check.service");
let DayHistoryModule = class DayHistoryModule {
};
DayHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            day_history_create_service_1.DayHistoryCreateService,
            day_history_get_service_1.DayHistoryGetService,
            prirsma_service_1.PrismaService,
            day_history_check_service_1.DayHistoryCheckService
        ],
        controllers: [
            day_history_get_controller_1.DayHistoryGetController
        ],
        exports: [
            day_history_create_service_1.DayHistoryCreateService,
            day_history_get_service_1.DayHistoryGetService,
            prirsma_service_1.PrismaService,
            day_history_check_service_1.DayHistoryCheckService
        ],
    })
], DayHistoryModule);
exports.DayHistoryModule = DayHistoryModule;
//# sourceMappingURL=day-history.module.js.map
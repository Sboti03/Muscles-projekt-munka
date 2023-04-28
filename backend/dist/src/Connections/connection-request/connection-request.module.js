"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRequestModule = void 0;
const common_1 = require("@nestjs/common");
const connection_request_create_controller_1 = require("./controllers/connection-request-create/connection-request-create.controller");
const connection_request_get_service_1 = require("./services/connection-request-get/connection-request-get.service");
const connection_request_check_service_1 = require("./services/connection-request-check/connection-request-check.service");
const connection_request_delete_service_1 = require("./services/connection-request-delete/connection-request-delete.service");
const prirsma_service_1 = require("../../Common/utils/prirsma.service");
const connection_request_create_service_1 = require("./services/connection-request-create/connection-request-create.service");
const connection_request_delete_controller_1 = require("./controllers/connection-request-delete/connection-request-delete.controller");
const connection_request_get_controller_1 = require("./controllers/connection-request-get/connection-request-get.controller");
const profile_module_1 = require("../../profile/profile.module");
const connection_check_service_1 = require("../connection/services/connection-check/connection-check.service");
const connection_get_service_1 = require("../connection/services/connection-get/connection-get.service");
let ConnectionRequestModule = class ConnectionRequestModule {
};
ConnectionRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [profile_module_1.ProfileModule],
        controllers: [connection_request_delete_controller_1.ConnectionRequestDeleteController, connection_request_get_controller_1.ConnectionRequestGetController, connection_request_create_controller_1.ConnectionRequestCreateController],
        providers: [
            prirsma_service_1.PrismaService,
            connection_request_get_service_1.ConnectionRequestGetService,
            connection_request_check_service_1.ConnectionRequestCheckService,
            connection_request_delete_service_1.ConnectionRequestDeleteService,
            connection_request_create_service_1.ConnectionRequestCreateService,
            connection_check_service_1.ConnectionCheckService,
            connection_get_service_1.ConnectionGetService,
        ],
        exports: [
            connection_request_get_service_1.ConnectionRequestGetService,
            connection_request_check_service_1.ConnectionRequestCheckService,
            connection_request_delete_service_1.ConnectionRequestDeleteService,
            connection_request_create_service_1.ConnectionRequestCreateService,
        ]
    })
], ConnectionRequestModule);
exports.ConnectionRequestModule = ConnectionRequestModule;
//# sourceMappingURL=connection-request.module.js.map
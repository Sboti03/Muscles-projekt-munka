"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const connection_get_service_1 = require("./services/connection-get/connection-get.service");
const connection_check_service_1 = require("./services/connection-check/connection-check.service");
const prirsma_service_1 = require("../../Common/utils/prirsma.service");
const connection_create_controller_1 = require("./controllers/connection-create/connection-create.controller");
const connection_create_service_1 = require("./services/connection-create/connection-create.service");
const connection_get_controller_1 = require("./controllers/connection-get/connection-get.controller");
const connection_delete_controller_1 = require("./controllers/connection-delete/connection-delete.controller");
const connection_request_module_1 = require("../connection-request/connection-request.module");
const connection_delete_service_1 = require("./services/connection-delete/connection-delete.service");
const user_module_1 = require("../../user/user.module");
let ConnectionModule = class ConnectionModule {
};
ConnectionModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, connection_request_module_1.ConnectionRequestModule],
        providers: [connection_get_service_1.ConnectionGetService, connection_check_service_1.ConnectionCheckService, prirsma_service_1.PrismaService, connection_create_service_1.ConnectionCreateService, connection_delete_service_1.ConnectionDeleteService],
        exports: [connection_get_service_1.ConnectionGetService, connection_check_service_1.ConnectionCheckService, connection_create_service_1.ConnectionCreateService, connection_delete_service_1.ConnectionDeleteService],
        controllers: [connection_create_controller_1.ConnectionCreateController, connection_get_controller_1.ConnectionGetController, connection_delete_controller_1.ConnectionDeleteController]
    })
], ConnectionModule);
exports.ConnectionModule = ConnectionModule;
//# sourceMappingURL=connection.module.js.map
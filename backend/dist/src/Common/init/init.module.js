"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitModule = void 0;
const common_1 = require("@nestjs/common");
const init_controller_1 = require("./init.controller");
const init_service_1 = require("./init.service");
const prirsma_service_1 = require("../utils/prirsma.service");
const auth_module_1 = require("../../auth/auth.module");
let InitModule = class InitModule {
};
InitModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [init_controller_1.InitController],
        providers: [init_service_1.InitService, prirsma_service_1.PrismaService]
    })
], InitModule);
exports.InitModule = InitModule;
//# sourceMappingURL=init.module.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitController = void 0;
const common_1 = require("@nestjs/common");
const init_service_1 = require("./init.service");
const auth_service_1 = require("../../auth/services/auth.service");
let InitController = class InitController {
    constructor(initService, authService) {
        this.initService = initService;
        this.authService = authService;
    }
    async init(res) {
        const result = await this.initService.init();
        if (result) {
            res.status(common_1.HttpStatus.CREATED).send([]);
        }
        else {
            res.status(common_1.HttpStatus.CONFLICT);
            res.send(result);
        }
    }
    async initPeriods() {
        await this.initService.initPeriods();
        return 'Done';
    }
    async initAdmin() {
        const admin = await this.authService.register({ email: 'admin@muscles.com', isCoach: false, password: 'admin' });
        await this.initService.createAdmin(admin.user.userId);
        return admin;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InitController.prototype, "init", null);
__decorate([
    (0, common_1.Get)('period'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InitController.prototype, "initPeriods", null);
__decorate([
    (0, common_1.Get)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InitController.prototype, "initAdmin", null);
InitController = __decorate([
    (0, common_1.Controller)('init'),
    __metadata("design:paramtypes", [init_service_1.InitService,
        auth_service_1.AuthService])
], InitController);
exports.InitController = InitController;
//# sourceMappingURL=init.controller.js.map
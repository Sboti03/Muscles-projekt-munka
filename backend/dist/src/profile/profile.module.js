"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const profile_get_service_1 = require("./services/profile-get/profile-get.service");
const profile_create_service_1 = require("./services/profile-create/profile-create.service");
const profile_update_service_1 = require("./services/profile-update/profile-update.service");
const profile_delete_service_1 = require("./services/profile-delete/profile-delete.service");
const prirsma_service_1 = require("../Common/utils/prirsma.service");
const profile_convert_service_1 = require("./services/profile-convert/profile-convert.service");
const profile_update_controller_1 = require("./controllers/profile-update/profile-update.controller");
const profile_get_controller_1 = require("./controllers/profile-get/profile-get.controller");
const auth_module_1 = require("../auth/auth.module");
const profile_check_service_1 = require("./services/profile-check/profile-check.service");
const image_service_1 = require("../Image/image.service");
const profile_image_service_1 = require("./services/profile-image/profile-image.service");
const profile_image_controller_1 = require("./controllers/profile-image/profile-image.controller");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        providers: [
            profile_get_service_1.ProfileGetService,
            profile_create_service_1.ProfileCreateService,
            profile_update_service_1.ProfileUpdateService,
            profile_delete_service_1.ProfileDeleteService,
            profile_convert_service_1.ProfileConvertService,
            prirsma_service_1.PrismaService,
            profile_check_service_1.ProfileCheckService,
            image_service_1.ImageService,
            profile_image_service_1.ProfileImageService
        ],
        controllers: [profile_update_controller_1.ProfileUpdateController, profile_get_controller_1.ProfileGetController, profile_image_controller_1.ProfileImageController],
        exports: [profile_get_service_1.ProfileGetService,
            profile_create_service_1.ProfileCreateService,
            profile_update_service_1.ProfileUpdateService,
            profile_delete_service_1.ProfileDeleteService,
            profile_convert_service_1.ProfileConvertService,
            prirsma_service_1.PrismaService,
            profile_check_service_1.ProfileCheckService
        ]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map
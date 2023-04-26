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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileGetService = void 0;
const common_1 = require("@nestjs/common");
const prirsma_service_1 = require("../../../Common/utils/prirsma.service");
let ProfileGetService = class ProfileGetService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getProfileIdByUserId(userId) {
        return this.prismaService.profileData.findFirstOrThrow({
            select: {
                profileId: true
            },
            where: {
                userId
            }
        });
    }
    getAllProfileDataByProfileId(profileId) {
        return this.prismaService.profileData.findFirstOrThrow({
            where: {
                profileId
            }
        });
    }
    getAllProfileAllData() {
        return this.prismaService.profileData.findMany({});
    }
    getAllProfile() {
        return this.prismaService.profileData.findMany({
            select: {
                profileId: true,
                userId: true,
                firstName: true,
                lastName: true,
                male: true
            }
        });
    }
    getProfileDataByProfileId(profileId) {
        return this.prismaService.profileData.findUniqueOrThrow({
            where: { profileId },
            select: {
                firstName: true,
                lastName: true,
                birthDay: true,
                height: true,
                registrationDate: true,
                userId: true,
                male: true
            }
        });
    }
    getAllProfilesByName(name) {
        return this.getProfilesByName(name);
    }
    async getProfiles(name, role, profileId) {
        const result = await this.getProfilesByName(name, role, profileId);
        common_1.Logger.log(result);
        return result;
    }
    getProfilesByName(name, role, profileId) {
        common_1.Logger.log(name);
        common_1.Logger.log(role);
        return this.prismaService.profileData.findMany({
            where: {
                NOT: {
                    profileId
                },
                user: {
                    role: {
                        roleName: role
                    }
                },
                OR: [
                    {
                        firstName: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lastName: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: {
                profileId: true,
                firstName: true,
                lastName: true,
                userId: true,
                male: true,
                user: {
                    select: {
                        email: true,
                        role: {
                            select: {
                                roleName: true
                            }
                        }
                    }
                }
            }
        });
    }
};
ProfileGetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prirsma_service_1.PrismaService])
], ProfileGetService);
exports.ProfileGetService = ProfileGetService;
//# sourceMappingURL=profile-get.service.js.map
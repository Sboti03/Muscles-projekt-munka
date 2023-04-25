"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserRefreshToken = exports.GetCurrentUser = exports.CheckProfileId = exports.GetAndCheckProfileId = exports.GetCurrentUserProfileId = exports.GetCurrentUserId = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.GetCurrentUserId = (0, common_2.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.sub;
});
exports.GetCurrentUserProfileId = (0, common_2.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.profileId;
});
exports.GetAndCheckProfileId = (0, common_2.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const profileId = user.profileId;
    if (!profileId || profileId === -1) {
        throw new common_1.NotFoundException('No profile found');
    }
    return profileId;
});
exports.CheckProfileId = (0, common_2.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const profileId = user.profileId;
    if (!profileId || profileId === -1) {
        throw new common_1.NotFoundException('No profile found');
    }
});
exports.GetCurrentUser = (0, common_2.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (!data)
        return request.user;
    return request.user[data];
});
exports.GetCurrentUserRefreshToken = (0, common_2.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
        const tokenFromHeader = request.headers.authorization.slice(7);
        if (tokenFromHeader) {
            return tokenFromHeader;
        }
        throw new common_1.NotFoundException('No token found');
    }
    return cookies.refreshToken;
});
//# sourceMappingURL=decorators.js.map
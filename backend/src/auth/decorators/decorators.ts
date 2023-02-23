import {NotFoundException, SetMetadata} from "@nestjs/common";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from "../types/jwt-payload";
import { JwtPayloadWithRt } from "../types/jwt-payload-token";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);



export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.sub;
  },
);

export const GetCurrentUserProfileId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.profileId;
    },
);

export const GetAndCheckProfileId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const profileId = user.profileId;
        if (!profileId || profileId === -1) {
            throw new NotFoundException('No profile found')
        }
        return profileId
    },
);

export const GetCurrentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      if (!data) return request.user;
      return request.user[data];
    },
  );
import { Strategy } from 'passport-local';
import { ModuleRef } from '@nestjs/core';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    validate(request: Request, email: string, password: string): Promise<{
        user: {
            userId: number;
            email: string;
            roleId: number;
            changedAt: Date;
            isBlocked: boolean;
            isDeleted: boolean;
            role: import(".prisma/client").roles;
        };
        tokens: import("../types/token").Tokens;
    }>;
}
export {};

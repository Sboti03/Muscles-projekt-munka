import { InitService } from "./init.service";
import { Response } from "express";
import { AuthService } from "../../auth/services/auth.service";
export declare class InitController {
    private initService;
    private authService;
    constructor(initService: InitService, authService: AuthService);
    init(res: Response): Promise<void>;
    initPeriods(): Promise<string>;
    initAdmin(): Promise<{
        user: {
            userId: number;
            email: string;
            roleId: number;
            refreshTokens: string[];
            changedAt: Date;
            isBlocked: boolean;
        };
        tokens: import("../../auth/types/token").Tokens;
    }>;
}

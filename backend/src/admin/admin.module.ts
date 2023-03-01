import { Module } from '@nestjs/common';
import {AdminBlockService} from "./services/admin-block/admin-block.service";
import {AdminDeleteService} from "./services/admin-delete/admin-delete.service";
import {PrismaService} from "../Common/utils/prirsma.service";
import {AdminController} from "./controllers/admin.controller";

@Module({
    providers: [
        AdminBlockService,
        AdminDeleteService,
        PrismaService,
    ],
    controllers: [
        AdminController,
    ],
    exports: [
        AdminBlockService,
        AdminDeleteService,
        PrismaService,
    ]
})
export class AdminModule {}

import {Controller, Get, HttpCode, HttpStatus, Res} from '@nestjs/common';
import {InitService} from "./init.service";
import {Response} from "express";
import {AuthService} from "../../auth/services/auth.service";

@Controller('init')
export class InitController {

    constructor(private initService: InitService,
                private authService: AuthService) {
    }

    @Get()
    async init(@Res() res: Response) {
        const result = await this.initService.init()
        if (result) {
            res.status(HttpStatus.CREATED).send([]);
        } else {
            res.status(HttpStatus.CONFLICT);
            res.send(result)
        }
    }

    @Get('admin')
    async initAdmin() {
        const admin = await this.authService.register(
            {email: 'admin@muscles.com', isCoach: false, password: 'admin'}
        )
        await this.initService.createAdmin(admin.user.userId)
        return admin
    }
}

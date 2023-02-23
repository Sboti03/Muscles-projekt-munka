import {Controller, Get, HttpCode, HttpStatus, Res} from '@nestjs/common';
import {InitService} from "./init.service";
import {Response} from "express";

@Controller('init')
export class InitController {

    constructor(private initService:InitService) {
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
}

import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Response} from "express";


@Controller('/base')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get()
  // sendFIle(@Res() res:Response ) {
  //   return r
  // }


  @Get('admin')
  getAdmin() {
    return 'ADMIN PAPA'
  }
}

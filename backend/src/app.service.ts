import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1 style="display: flex; font-size: 50px">💪Hello Muscles!<div style="transform: scaleX(-1)">💪</div></h1>';
  }
}

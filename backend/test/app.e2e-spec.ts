import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, RequestMethod, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import * as cookieParser from "cookie-parser";
import {ConfigModule} from "@nestjs/config";

describe('AppController (e2e)', () => {
    let app: INestApplication;

    const user = {
        email: 'test@user.com',
        password: 'test',
        isCoach: false
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: `.dev.env`
                })],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            transform: true
        }));

        app.setGlobalPrefix('api/', {
            exclude: [
                {path: '/', method: RequestMethod.ALL},
                {path: '/admin', method: RequestMethod.ALL}
            ]
        })
        app.use(cookieParser())
        await app.init();
    });




});

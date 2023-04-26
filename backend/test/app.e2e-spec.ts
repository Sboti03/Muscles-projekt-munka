import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, RequestMethod, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import * as cookieParser from "cookie-parser";
import {ConfigModule} from "@nestjs/config";
import {PrismaClient} from "@prisma/client";
import * as crypto from "crypto";
import {Tokens} from "../src/auth/types/token";
import LoginResponse from "../src/auth/dto/login.response";

describe('AppController (e2e)', () => {
    let app: INestApplication;

    let user = {
        email: `test@user.com`,
        password: 'test',
        isCoach: false
    }

    let coach = {
        email: 'test@coach.com',
        password: 'test',
        isCoach: true
    }

    let userToken: Tokens = {accessToken: '', refreshToken: ''};
    let coachToken: Tokens = {refreshToken: '', accessToken: ''};

    beforeAll(async () => {
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

    async function loginUser(pass?: string) {
        if (pass) {
            user.password = pass
        }
        const res = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send(user)
            .expect(200)
        const resBody = res.body as LoginResponse
        userToken = resBody.tokens
    }


    describe('POST /api/auth/register', () => {
        it('should return 400 wrong email', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send({email: 'sadsa', password: 'asd', isCoach: false})
                .expect(400)
        })
        it('should return 400 wrong password', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send({email: 'asd@asd.com', password: '', isCoach: false})
                .expect(400)
        })
        it('should return 400 wrong isCoach', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send({email: 'asd@asd.com', password: 'asd'})
                .expect(400)
        })

        it('should return 201', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send(user)
                .expect(201)
        })
        it('should return 201', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send(coach)
                .expect(201)
        });

        it('should return 400 user already exists', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send(user)
                .expect(403)
        })

        it('should return 400 coach already exists', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send(coach)
                .expect(403)
        })

        it('should return 400 user already exists', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send({email: user.email, password: 'asd', isCoach: true})
                .expect(403)
        })
        it('should return 400 coach already exists', () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send({email: coach.email, password: 'asd', isCoach: false})
                .expect(403)
        })
    })
    describe('POST /api/auth/login', () => {

        it('should return 403 wrong email', () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({email: 'test@uuuser.coadssa', password: 'asd'})
                .expect(403)
        })
        it('should return 403 wrong password', () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({email: user.email, password: 'asdsad'})
                .expect(403)
        })

        it('should return 200', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send(user)
                .expect(200)
            const body = response.body as LoginResponse
            expect(body.tokens.accessToken).toBeDefined()
            expect(body.tokens.refreshToken).toBeDefined()
        })
        it('should return 200', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send(coach)
                .expect(200)
            const body = response.body as LoginResponse
            expect(body.tokens.accessToken).toBeDefined()
            expect(body.tokens.refreshToken).toBeDefined()
        })
    })

    describe('GEt /api/auth/refresh',  () => {
        it('should return 401 wrong refresh token', () => {
            return request(app.getHttpServer())
                .get('/api/auth/refresh')
                .send("asdasdsdads")
                .expect(401)
        })
        it('should return 200', async () => {
            await loginUser()
            const response = await request(app.getHttpServer())
                .get('/api/auth/refresh')
                .set('Authorization', `Bearer ${userToken.refreshToken}`)
            expect(response.body.newToken).toBeDefined()
        });
    })

    // Get new access token
    describe('GET /api/auth/access',  () => {
        it('should return 401 wrong refresh token', () => {
            return request(app.getHttpServer())
                .get('/api/auth/access')
                .set('Authorization', `Bearer sadasdkaéldksa`)
                .expect(401)
        })
        it('should return 200', async () => {
            await loginUser()
            const result = await request(app.getHttpServer())
                .get('/api/auth/access')
                .set('Authorization', `Bearer ${userToken.refreshToken}`)
                .expect(200)
            expect(result.body.newToken).toBeDefined()
        })
    })

    describe('PATCH /api/auth/password', () => {
        // Pass not match
        it('should return 404', async () => {
            await loginUser()
            return request(app.getHttpServer())
                .patch('/api/auth/password')
                .set('Authorization', `Bearer ${userToken.accessToken}`)
                .send({oldPassword: 'asdasd', newPassword: 'asdasd'})
                .expect(404)
        })
        // Pass same
        it('should return 400', () => {
            return request(app.getHttpServer())
                .patch('/api/auth/password')
                .set('Authorization', `Bearer ${userToken.accessToken}`)
                .send({oldPassword: user.password, newPassword: user.password})
                .expect(400)
        })
        it('should return 200', async () => {
            const response = await request(app.getHttpServer())
                .patch('/api/auth/password')
                .set('Authorization', `Bearer ${userToken.accessToken}`)
                .send({oldPassword: user.password, newPassword: 'asdasd'})
                .expect(200)
            expect(response.body.newToken).toBeDefined()
        })
    })


    describe('GET /api/auth/logout',  () => {
        it('should return 200', async () => {
            await loginUser('asdasd')
            return request(app.getHttpServer())
                .get('/api/auth/logout')
                .set('Authorization', `Bearer ${userToken.refreshToken}`)
                .expect(200)
        })

        it('should return 404', () => {
            return request(app.getHttpServer())
                .get('/api/auth/logout')
                .set('Authorization', `Bearer ${userToken.refreshToken}`)
                .expect(404)
        })

        it('should return 403', () => {
            return request(app.getHttpServer())
                .get('/api/auth/refresh')
                .set('Authorization', `Bearer ${userToken.refreshToken}`)
                .expect(403)
        })

        it('should return 403', () => {
            return request(app.getHttpServer())
                .get('/api/auth/access')
                .set('Authorization', `Bearer ${userToken.refreshToken}`)
                .expect(403)
        })
    })


    afterAll(async () => {
        const admin = {
            email: 'admin@muscles.com',
            password: 'admin'
        }
        await app.close();
        const prisma = new PrismaClient()
        await prisma.users.update({
            where: {email: user.email},
            data: {email: crypto.randomUUID() + 'TEST'}
        })
        await prisma.users.update({
            where: {email: coach.email},
            data: {email: crypto.randomUUID() + 'TEST'}
        })
    })


});

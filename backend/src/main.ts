import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {RequestMethod, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";
import * as process from "process";
import {AuthModule} from "./auth/auth.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));

    app.setGlobalPrefix('api/', {
        exclude: [
            {path: '/', method: RequestMethod.ALL},
        ]
    })

    const config = new DocumentBuilder()
        .setTitle('Muscles API')
        .setDescription('The Muscles API')
        .setVersion('2.0')
        .addTag('admin/user')
        .addTag('admin/food')
        .addTag('admin/profile')
        .addTag('auth')
        .addTag('connection')
        .addTag('connection-request')
        .addTag('day-history')
        .addTag('goals')
        .addTag('food')
        .addTag('meal-history')
        .addTag('profile')
        .addTag('user')
        .addTag('weight-history')
        .setTitle("Muscles")
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
    app.use(cookieParser())

    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}

bootstrap();

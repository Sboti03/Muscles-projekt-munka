import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {RequestMethod, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";
import * as process from "process";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        snapshot: true
    });
    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));

    app.setGlobalPrefix('api/', {
        exclude: [
            {path: '/', method: RequestMethod.ALL},
            {path: '/admin', method: RequestMethod.ALL}
        ]
    })

    const config = new DocumentBuilder()
        .setTitle('Muscles API')
        .setDescription('The Muscles API')
        .setVersion('1.0')
        .addTag('muscles')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
    app.use(cookieParser())

    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}

bootstrap();

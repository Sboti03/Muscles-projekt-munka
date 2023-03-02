import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  const config = new DocumentBuilder()
      .setTitle('Muscles API')
      .setDescription('The Muscles API')
      .setVersion('1.0')
      .addTag('muscles')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(cookieParser())
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

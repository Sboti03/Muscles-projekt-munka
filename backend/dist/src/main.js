"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const process = require("process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    app.setGlobalPrefix('api/', {
        exclude: [
            { path: '/', method: common_1.RequestMethod.ALL },
        ]
    });
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(cookieParser());
    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
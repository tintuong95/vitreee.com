"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
        logger: ['error', 'warn', 'log', 'verbose', 'debug'],
    });
    app.enableCors();
    app.use((0, helmet_1.default)());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('vitreee.com example')
        .setDescription('The ViTreee API description')
        .setVersion('1.0')
        .setExternalDoc('Postman Collection', '/docs-json')
        .addTag('vitreee')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
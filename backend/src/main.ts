import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app: INestApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      rawBody: true, //application/json
      logger: ['error', 'warn', 'log', 'verbose', 'debug'],
    });
  app.useGlobalPipes(new ValidationPipe());

  /**
   * setup cors
   */
  app.enableCors();
  /**
   * setup csur
   */
  // app.use(csurf());
  /**
   * setup helmet
   */
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('vitreee.com example')
    .setDescription('The ViTreee API description')

    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/docs-json')

    .addTag('vitreee')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();

import 'reflect-metadata';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { AllExceptionsFilter } from '@/core/exceptions';
import { ValidationExceptionFilter } from '@/core/exceptions/validation-exceptions.handler';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //, appOptions);

  // Set the global prefix to "api"
  app.setGlobalPrefix('api');

  // Enable versioning with the URI strategy
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: false,
      validationError: { target: true },
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
    }),
  );

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new ValidationExceptionFilter(),
  );

  app.use(
    helmet({
      contentSecurityPolicy: false, // <-- allow Swagger UI to load resources
    }),
  );

  const configService = app.get(ConfigService);

  mongoose.set('debug', false);

  await app.listen(configService.get('PORT') || 3000);
}

process.on('uncaughtException', (error) => {
  Logger.error(`Uncaught Exception: ${error.message}`, error.stack);
});

process.on('unhandledRejection', (reason) => {
  Logger.error(`Unhandled Rejection: ${JSON.stringify(reason)}`);
});

// eslint-ignore  @typescript-eslint/no-floating-promises
void bootstrap();

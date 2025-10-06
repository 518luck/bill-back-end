import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

import { validationConfig } from '@/config/validation.config';
import { swaggerConfig } from '@/config/swgger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bill/v1');

  //配置swagger
  swaggerConfig(app);

  validationConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

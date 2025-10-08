import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { validationConfig } from '@/config/validation.config';
import { swaggerConfig } from '@/config/swgger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bill/v1');

  //配置swagger
  swaggerConfig(app);
  // 配置全局校验管道 - 目前只响应了DTO
  validationConfig(app);
  // 配置全局序列化拦截器
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

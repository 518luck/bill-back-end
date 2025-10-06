import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bill/v1');

  //配置swagger
  const config = new DocumentBuilder()
    .setTitle('Bill API')
    .setDescription('账单系统接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只保留 DTO 中定义的字段
      forbidNonWhitelisted: true, // 如果传了 DTO 中没有的字段就报错
      transform: true, // 自动类型转换（比如字符串转 number）
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

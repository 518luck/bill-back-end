import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //配置swagger
  const config = new DocumentBuilder()
    .setTitle('Bill API')
    .setDescription('账单系统接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('bill/v1');
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

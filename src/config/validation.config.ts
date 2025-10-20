import { INestApplication, ValidationPipe } from '@nestjs/common';

export const validationConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只保留 DTO 中定义的字段
      forbidNonWhitelisted: false, // 如果传了 DTO 中没有的字段就报错
      transform: true, // 自动类型转换（比如字符串转 number）
    }),
  );
};

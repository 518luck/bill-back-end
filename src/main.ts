import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';

declare const module: {
  hot?: { accept: () => void; dispose: (callback: () => void) => void };
};

import { AppModule } from '@/app.module';
import { validationConfig } from '@/config/validation.config';
import { swaggerConfig } from '@/config/swgger.config';
import { RolesGuard } from '@/guard/roles.guard';
import { CurrentUserInterceptor } from '@/interceptors/current-use.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bill/v1');

  //配置swagger
  swaggerConfig(app);
  // 配置全局校验管道 - 目前只响应了DTO
  validationConfig(app);
  // 配置全局序列化拦截器
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new CurrentUserInterceptor(),
  );
  // 注册全局守卫
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept(); // 接受更新
    module.hot.dispose(() => {
      void app.close(); // 使用 void 忽略 Promise
    }); // 热重载前关闭应用
  }
}

void bootstrap();

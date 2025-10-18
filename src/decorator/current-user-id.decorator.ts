import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '@/interceptors/current-use.interceptor';

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    console.log('🚀 ~ req:', req.user);
    return req.userId;
  },
);

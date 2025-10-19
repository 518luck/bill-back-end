import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/auth/decorator/public.decorator';

import { JwtPayload } from '@/auth/types/jwt-payload.type';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // 放行
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtPayload>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException(`Token 无效或已过期 ${info}`);
    }
    return user as TUser;
  }
}

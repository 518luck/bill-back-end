import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from '@/enum/user-role.enum';
import { JwtPayload } from '@/auth/types/jwt-payload.type';
import { IS_PUBLIC_KEY } from '@/auth/decorator/public.decorator';

interface RequestWithUser extends Request {
  user: JwtPayload & { role: string };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // 这个方法会在每个受保护的路由被调用
  // 它会检查当前用户是否有足够的权限来访问这个路由
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true; // 公开路由直接放行

    // 从当前路由的元数据中取出 roles 数组
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      // getHandler() 会返回当前路由的处理函数
      // getClass() 会返回当前路由所属的控制器类
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    //取出当前请求对象当中的user , user是在JWT验证策略当中返回的
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    return requiredRoles.some((role) => user.role === role);
  }
}

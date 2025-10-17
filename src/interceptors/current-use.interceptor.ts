import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRole } from '@/enum/user-role.enum';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    username: string;
    role: UserRole;
  };
  userId: string;
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    if (req.user) {
      req.userId = req.user.userId; // 全局挂 userId
    }
    return next.handle();
  }
}

// src/middleware/user-id.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req?.user?.sub) {
      // 自动注入到请求体
      req.body.user_id = req.user.sub;
    }
    next();
  }
}

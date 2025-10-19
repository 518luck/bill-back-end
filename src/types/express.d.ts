import { Request } from 'express';
import { JwtPayload } from '@/auth/types/jwt-payload.type';

declare module 'express' {
  interface Request {
    user?: JwtPayload;
    body: {
      [key: string]: any;
    };
  }
}

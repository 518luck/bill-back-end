import { UserRole } from '@/enum/user-role.enum';

export interface JwtPayload {
  sub: string; //sub (subject): JWT的主体（通常是用户ID）
  username: string;
  role: UserRole;
}

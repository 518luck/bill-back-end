import { UserRole } from '@/enum/user-role.enum';

export interface JwtPayload {
  sub: string;
  username: string;
  role: UserRole;
}

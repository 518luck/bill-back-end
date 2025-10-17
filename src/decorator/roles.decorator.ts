import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@/enum/user-role.enum';

//...roles: UserRole[] 表示roles参数是一个变长参数，它可以接收多个UserRole枚举值
// 这个装饰器会将roles数组存储在当前路由的元数据中
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

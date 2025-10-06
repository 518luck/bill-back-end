// 注册 DTO
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { BaseUserDto } from '@/auth/dto/base-password.dto';

export class RegisterDto extends BaseUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  verificationCode: string; // 前端自己模拟验证码
}

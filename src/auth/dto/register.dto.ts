// 注册 DTO
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Length,
} from 'class-validator';

import { BaseUserDto } from '@/auth/dto/base-password.dto';

export class RegisterDto extends BaseUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  verificationCode: string; // 前端自己模拟验证码
}

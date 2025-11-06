import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { BaseUserDto } from './base-password.dto';

export class EmailRegisterDto extends BaseUserDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '验证码不能为空' })
  @MinLength(6, { message: '验证码至少 6 位' })
  @MaxLength(6, { message: '验证码最多 6 位' })
  verificationCode: string;
}

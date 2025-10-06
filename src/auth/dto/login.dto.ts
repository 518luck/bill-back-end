import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseUserDto } from '@/auth/dto/base-password.dto';

export class LoginDto extends BaseUserDto {
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须是字符串' })
  @MinLength(3, { message: '账号至少 2 位' })
  @MaxLength(50, { message: '账号最多 50 位' })
  account: string; // 可以是用户名 / 邮箱 / 手机号
}

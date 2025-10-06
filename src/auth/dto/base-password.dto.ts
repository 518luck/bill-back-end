import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BaseUserDto {
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(8, { message: '密码至少 8 位' })
  @MaxLength(32, { message: '密码最多 32 位' })
  password: string;
}

import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名至少 3 位' })
  @MaxLength(20, { message: '用户名最多 20 位' })
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: '用户名只能包含字母、数字、下划线或点',
  })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(8, { message: '密码至少 8 位' })
  @MaxLength(32, { message: '密码最多 32 位' })
  password: string;
}

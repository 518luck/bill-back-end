import { IsString, IsOptional, MaxLength } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class RegisterDto extends BaseUserDto {
  @IsOptional()
  @IsString({ message: '昵称必须是字符串' })
  @MaxLength(30, { message: '昵称最多 30 位' })
  nickname?: string;
}

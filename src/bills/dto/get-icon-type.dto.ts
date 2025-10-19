import { IsEnum, IsOptional, IsString } from 'class-validator';

import { IconType } from '@/enum/icon-type.enum';
export class GetIconTypeDto {
  @IsEnum(IconType, { message: '类型必须是 income 或 expense' })
  type: IconType;

  @IsOptional()
  @IsString({ message: '用户ID必须是字符串' })
  user_id?: string;
}

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
} from 'class-validator';

import { IconType } from '@/enum/icon-type.enum';

export class CreateIconDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString({ message: '分类名称必须是字符串' })
  @MaxLength(4, { message: '分类名称不能超过4个字符' })
  title: string;

  @IsEnum(IconType, { message: '类型必须是 income 或 expense' })
  type: IconType;

  @IsOptional()
  @IsString({ message: '图标名称必须是字符串' })
  icon_name?: string;

  @IsOptional()
  @IsString({ message: '用户ID必须是字符串' })
  user_id?: string;

  // 只有管理员才能发送这个
  @IsOptional()
  global?: boolean;
}

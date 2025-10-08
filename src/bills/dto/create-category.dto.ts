import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
} from 'class-validator';

import { CategoryType } from '@/enum/category-type.enum';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString({ message: '分类名称必须是字符串' })
  name: string;

  @IsEnum(CategoryType, { message: '类型必须是 income 或 expense' })
  type: CategoryType;

  @IsOptional()
  @IsInt({ message: 'userId 必须是整数' })
  userId?: number; // 可选，不传默认系统分类 userId = 0
}

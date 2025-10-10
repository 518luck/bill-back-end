import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

import { CategoryType } from '@/enum/category-type.enum';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString({ message: '分类名称必须是字符串' })
  name: string;

  @IsEnum(CategoryType, { message: '类型必须是 income 或 expense' })
  type: CategoryType;

  @IsOptional()
  @IsString({ message: 'userId 必须是字符串' })
  userId?: string; // 可选，不传默认系统分类 userId = '0'
}

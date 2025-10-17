import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
} from 'class-validator';

import { CategoryType } from '@/enum/category-type.enum';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString({ message: '分类名称必须是字符串' })
  @MaxLength(4, { message: '分类名称不能超过4个字符' })
  title: string;

  @IsEnum(CategoryType, { message: '类型必须是 income 或 expense' })
  type: CategoryType;

  @IsOptional()
  @IsString({ message: '图标名称必须是字符串' })
  icon_name?: string;
}

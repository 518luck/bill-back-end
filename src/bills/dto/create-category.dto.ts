import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

import { CategoryType } from '@/enum/category-type.enum';

export class CreateCategoryDto {
  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString({ message: '分类名称必须是字符串' })
  name: string;

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType;

  @IsOptional()
  userId?: number; // 可选，不传默认系统分类 userId = 0
}

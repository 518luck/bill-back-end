import { IsEnum } from 'class-validator';

import { CategoryType } from '@/enum/category-type.enum';
export class GetCategoryTypeDto {
  @IsEnum(CategoryType, { message: '类型必须是 income 或 expense' })
  type: CategoryType;
}

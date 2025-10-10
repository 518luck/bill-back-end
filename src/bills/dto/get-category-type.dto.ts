import { IsNotEmpty, IsEnum, IsString } from 'class-validator';

import { CategoryType } from '@/enum/category-type.enum';
export class GetCategoryTypeDto {
  @IsString()
  @IsNotEmpty({ message: '用户 ID 不能为空' })
  userId: string;

  @IsEnum(CategoryType, { message: '类型必须是 income 或 expense' })
  type: CategoryType;
}

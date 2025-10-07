// src/modules/category/entity/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { CategoryType } from '@/enum/category-type.enum';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  userId: number; // 0 表示系统默认分类

  @Column({ length: 50 })
  name: string; // 分类名称

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType; // 收入或支出
}

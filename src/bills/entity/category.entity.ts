import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';

import { CategoryType } from '@/enum/category-type.enum';
import { Bill } from '@/bills/entity/bill.entity';

@Index(['userId', 'name', 'type'], { unique: true })
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

  @OneToMany(() => Bill, (bill) => bill.category)
  bills: Bill[];
}

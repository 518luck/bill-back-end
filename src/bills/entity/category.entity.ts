import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';

import { CategoryType } from '@/enum/category-type.enum';
import { Bill } from '@/bills/entity/bill.entity';

@Index(['user_id', 'icon_name', 'type', 'title'], { unique: true })
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: '0' })
  user_id: string; // 0 表示系统默认分类

  @Column({ length: 50 })
  title: string; // 分类名称

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType; // 收入或支出

  @Column({ length: 100, nullable: true })
  icon_name: string; // 存 react-icons 组件名，比如 "FaUtensils"

  @OneToMany(() => Bill, (bill) => bill.category)
  bills: Bill[];
}

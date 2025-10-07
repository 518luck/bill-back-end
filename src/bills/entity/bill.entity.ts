import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@/users/entity/user.entity';
import { Category } from '@/bills/entity/category.entity';
import { CategoryType } from '@/enum/category-type.enum';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  money: number;

  @Column({ nullable: true, length: 200 })
  note?: string; // 备注

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string; // 用户指定的账单消费日期

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'userId' }) // ← 指定外键列
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}

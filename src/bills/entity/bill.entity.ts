import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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

  @Column({
    type: 'date',
    nullable: true,
    default: () => '(CURRENT_DATE)',
  })
  date: Date; // 用户指定的账单消费日期

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

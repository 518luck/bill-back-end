import { User } from '@/users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BillType } from '@/enum/bill-type.enum';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  money: number;

  @Column({ type: 'enum', enum: BillType })
  type: BillType; // 收入或支出

  @Column({ length: 100 })
  category: string; // 分类（如“餐饮”、“交通”）

  @Column({ nullable: true, length: 200 })
  note?: string; // 备注

  @Column({ type: 'date' })
  date: string; // 账单日期

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'userId' }) // ← 指定外键列
  user: User;
}

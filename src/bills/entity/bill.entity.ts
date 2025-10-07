import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  money: number;

  @Column({ type: 'enum', enum: ['income', 'expense'] })
  type: 'income' | 'expense'; // 收入或支出

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
}

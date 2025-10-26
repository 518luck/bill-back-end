import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Debt } from '@/debts/entity/debt.entity';

// 存放每一次还款明细
@Entity('repayments')
export class Repayment {
  //主键
  @PrimaryColumn({ type: 'varchar', length: 32 })
  id: string;

  //关联的债务id
  @ManyToOne(() => Debt, (debt) => debt.repayments)
  debt_id: Debt;

  // 本次还债金额
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  // 还款日期
  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  note?: string;
}

import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Repayment } from '@/debts/entity/repayment.entity';
import { User } from '@/users/entity/user.entity';
//存放"总体信息"
@Entity('debts')
export class Debt {
  // 主键(唯一ID)
  @PrimaryColumn({ type: 'varchar', length: 32 })
  id: string;

  // 关联用户ID
  @ManyToOne(() => User, (user) => user.debts)
  user: User;

  // 欠款方
  @Column()
  creditor: string;

  //总欠款金额
  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  //累计已还金额
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  repaid_amount: number;

  // 本月应还金额 //太难算了,直接让用户自己存吧
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  current_month_due: number;

  // 欠款开始日期
  @Column({ type: 'date', nullable: true })
  start_date: Date;

  //预计还清日期
  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @OneToMany(() => Repayment, (repayment) => repayment.debt_id)
  repayments: Repayment[];
}

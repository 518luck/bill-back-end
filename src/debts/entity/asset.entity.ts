import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/users/entity/user.entity';

@Entity('assets')
export class Asset {
  // 主键(唯一ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.asset)
  @JoinColumn()
  user: User;

  // 是否让账单参与核算
  @Column({ type: 'boolean', default: true })
  included_in_bill_calc: boolean;

  // 选择当月还是全部负债进行核算
  @Column({ type: 'boolean', default: true })
  calc_debt_for_current_month: boolean;

  // 资产余额
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;
}

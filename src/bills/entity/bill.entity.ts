import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from '@/users/entity/user.entity';
import { IconType } from '@/enum/icon-type.enum';

@Entity('bill')
export class Bill {
  @PrimaryColumn({ type: 'varchar', length: 32 })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  money: number;

  // 备注
  @Column({ length: 200 })
  note: string;

  //消费/支出
  @Column({ type: 'enum', enum: IconType })
  type: IconType;

  @Column({ length: 50 })
  icon_name: string;

  // 用户指定的账单消费日期
  @Column({
    type: 'date',
    nullable: true,
    default: () => '(CURRENT_DATE)',
  })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

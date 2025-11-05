import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserAccount } from '@/users/entity/user-account.entity';
import { Bill } from '@/bills/entity/bill.entity';
import { UserRole } from '@/enum/user-role.enum';
import { Debt } from '@/debts/entity/debt.entity';
import { Asset } from '@/debts/entity/asset.entity';
import { UserEmail } from '@/users/entity/user-email.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => UserAccount, (account) => account.user)
  accounts: UserAccount[];
  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];

  // 一个用户对应着多个债务
  @OneToMany(() => Debt, (debt) => debt.user)
  debts: Debt[];

  // 一个用户对应着一个资产
  @OneToOne(() => Asset, (asset) => asset.user)
  asset: Asset;

  // 一个用户对应着多个邮箱
  @OneToMany(() => UserEmail, (email) => email.user, {
    cascade: true,
  })
  emails: UserEmail[];
}

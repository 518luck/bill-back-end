import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserAccount } from '@/users/entity/user-account.entity';
import { Bill } from '@/bills/entity/bill.entity';
import { UserRole } from '@/enum/user-role.enum';
import { Debt } from '@/debts/entity/debt.entity';

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
}

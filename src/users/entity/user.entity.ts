import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserAccount } from '@/users/entity/user-account.entity';
import { Bill } from '@/bills/entity/bill.entity';
import { UserRole } from '@/enum/user-role.enum';

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
  @OneToMany(() => Bill, (bill) => bill.user) // ← 反向关联账单
  bills: Bill[];
}

// users/entity/user-account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@/users/entity/user.entity';
import { AccountType } from '@/enum/account-type.enum';

@Entity('user_account')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AccountType })
  type: AccountType;

  @Column({ unique: true })
  value: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}

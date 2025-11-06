// users/entity/user-account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@/users/entity/user.entity';

@Entity('user_account')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['EMAIL', 'PHONE'] })
  type: string;

  @Column({ unique: true })
  value: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}

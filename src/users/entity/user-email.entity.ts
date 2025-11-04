// src/users/entity/user-email.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_email')
export class UserEmail {
  @PrimaryGeneratedColumn()
  id: number;

  // 邮箱地址
  @Column({ unique: true })
  email: string;

  // 是否验证
  @Column({ default: false })
  verified: boolean;

  // 关联用户
  @ManyToOne(() => User, (user) => user.emails)
  user: User;
}

// src/users/entity/user-email.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_email')
export class UserEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => User, (user) => user.emails)
  user: User;
}

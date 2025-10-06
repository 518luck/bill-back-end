import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAccount } from '@/users/entity/user-account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname: string;

  @OneToMany(() => UserAccount, (account) => account.user)
  accounts: UserAccount[];
}

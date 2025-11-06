import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';

import { User } from '@/users/entity/user.entity';
import { UserAccount } from '@/users/entity/user-account.entity';
import { RegisterDto } from '@/auth/dto';
import { UserEmail } from '@/users/entity/user-email.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
    @InjectRepository(UserEmail)
    private readonly userEmailRepository: Repository<UserEmail>,
  ) {}

  // 通过用户名查找用户
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  // 通过邮箱查找用户（已存在）
  async findByEmail(email: string): Promise<User | null> {
    const userEmail = await this.userEmailRepository.findOne({
      where: { email },
      relations: ['user'],
    });
    return userEmail?.user || null;
  }

  // 统一查找方法（支持用户名和邮箱）
  async findByAccount(account: string): Promise<User | null> {
    // 先尝试用户名查找
    let user = await this.findByUsername(account);

    // 如果用户名查找失败，尝试邮箱查找
    if (!user) {
      user = await this.findByEmail(account);
    }

    return user;
  }

  // 创建用户
  async createUser(registerDto: RegisterDto) {
    const hashedPassword = await argon2.hash(registerDto.password);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // 更新用户密码
  async updateUserPassword(userId: string, newPassword: string) {
    const hashedPassword = await argon2.hash(newPassword);
    await this.userRepository.update(userId, {
      password: hashedPassword,
    });
  }
}

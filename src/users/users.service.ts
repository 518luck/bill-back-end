import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';

import { User } from '@/users/entity/user.entity';
import { UserAccount } from '@/users/entity/user-account.entity';
import { RegisterDto } from '@/auth/dto';
import { AccountType } from '@/enum/account-type.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
  ) {}

  // 查找用户通过用户名
  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  // 查找用户通过账号类型和值
  async findAccount(value: string, type: AccountType) {
    return this.userAccountRepository.findOne({
      where: { value, type },
      relations: ['user'],
    });
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

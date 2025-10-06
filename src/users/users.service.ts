import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';

import { User } from '@/users/entity/user.entity';
import { RegisterDto } from '@/auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async createUser(registerDto: RegisterDto) {
    const hashedPassword = await argon2.hash(registerDto.password);

    const user = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
}

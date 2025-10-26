import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDebtDto } from '@/debts/dto/create-dabt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 创建债务
  async createDebt(createDebtDto: CreateDebtDto, userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}

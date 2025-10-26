import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDebtDto, CreateRepaymentDto } from '@/debts/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Debt } from '@/debts/entity/debt.entity';
import { SnowflakeService } from '@/common/snowflake/snowflake.service';
import { Repayment } from '@/debts/entity/repayment.entity';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
    @InjectRepository(Repayment)
    private readonly repaymentsRepository: Repository<Repayment>,
    private readonly snowflakeService: SnowflakeService,
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

    const debt = this.debtsRepository.create({
      ...createDebtDto,
      id: this.snowflakeService.generate(),
      user,
    });
    await this.debtsRepository.save(debt);
    return debt;
  }

  // 获取用户所有债务
  async getDebts(userId: string) {
    const debts = await this.debtsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return debts;
  }

  // 偿还债务
  async repayDebt(createRepaymentDto: CreateRepaymentDto, userId: string) {
    const { debt_id, amount } = createRepaymentDto;
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const debt = await this.debtsRepository.findOneBy({
      id: debt_id,
    });
    if (!debt) {
      throw new HttpException('债务不存在', HttpStatus.BAD_REQUEST);
    }
    const repayment = this.repaymentsRepository.create({
      ...createRepaymentDto,
      id: this.snowflakeService.generate(),
      debt_id: debt,
    });
    await this.repaymentsRepository.save(repayment);

    // 更新债务的已偿还金额
    debt.repaid_amount = Number(amount) + Number(debt.repaid_amount);
    await this.debtsRepository.save(debt);
    // 如果已偿还金额等于债务金额，债务状态改为已还清
    if (debt.repaid_amount >= debt.total_amount) {
      debt.status = 'paid';
    }

    //还欠金额
    const owe_amount = Number(debt.total_amount) - Number(debt.repaid_amount);
    return {
      success: true,
      message: `还欠${owe_amount.toFixed(2)}元,加油!`,
    };
  }
}

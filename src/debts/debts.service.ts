import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDebtDto, CreateRepaymentDto, UpdateDebtDto } from '@/debts/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Debt, DebtStatusEnum } from '@/debts/entity/debt.entity';
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
    return {
      success: true,
      message: '小账童记下啦',
    };
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

  // 删除债务
  async deleteDebt(id: string, userId: string) {
    const debt = await this.debtsRepository.findOne({
      where: {
        id,
      },
      relations: { user: true },
    });
    if (!debt) {
      throw new HttpException('债务不存在', HttpStatus.BAD_REQUEST);
    }
    if (debt.status !== DebtStatusEnum.PAID) {
      throw new HttpException('未还清的债务不能删除哦', HttpStatus.BAD_REQUEST);
    }
    if (debt.user.id !== userId) {
      throw new HttpException('无权删除此债务', HttpStatus.FORBIDDEN);
    }
    await this.debtsRepository.delete(id);
    return {
      success: true,
      message: '删除成功',
    };
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
    if (Number(debt.repaid_amount) >= Number(debt.total_amount)) {
      debt.status = DebtStatusEnum.PAID;
      await this.debtsRepository.save(debt);
    }

    //还欠金额
    const owe_amount = Number(debt.total_amount) - Number(debt.repaid_amount);
    const message =
      debt.status === DebtStatusEnum.PAID
        ? '还清啦'
        : `还欠${owe_amount.toFixed(2)}元,加油!`;

    return {
      success: true,
      message,
    };
  }

  // 获取债务的还款记录
  async getRepayments(debt_id: string) {
    const debt = await this.debtsRepository.findOne({
      where: {
        id: debt_id,
      },
      relations: { repayments: true },
    });
    if (!debt) {
      throw new HttpException('债务不存在', HttpStatus.BAD_REQUEST);
    }
    return debt.repayments;
  }

  // 更新债务
  async updateDebt(id: string, updateDebt: UpdateDebtDto) {
    const debt = await this.debtsRepository.findOne({
      where: {
        id,
      },
    });
    if (!debt) {
      throw new HttpException('债务不存在', HttpStatus.BAD_REQUEST);
    }
    if (updateDebt.creditor !== undefined) debt.creditor = updateDebt.creditor;
    if (updateDebt.total_amount !== undefined)
      debt.total_amount = updateDebt.total_amount;
    if (updateDebt.repaid_amount !== undefined)
      debt.repaid_amount = updateDebt.repaid_amount;
    if (updateDebt.current_month_due !== undefined)
      debt.current_month_due = updateDebt.current_month_due;

    // 根据累计已还金额自动更新状态
    if (Number(debt.repaid_amount) >= Number(debt.total_amount)) {
      debt.status = DebtStatusEnum.PAID;
    } else {
      debt.status = DebtStatusEnum.OWED;
    }

    await this.debtsRepository.save(debt);

    return {
      success: true,
      message: '更新成功',
    };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDebtDto, CreateRepaymentDto, UpdateDebtDto } from '@/debts/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Debt, DebtStatusEnum } from '@/debts/entity/debt.entity';
import { SnowflakeService } from '@/common/snowflake/snowflake.service';
import { Repayment } from '@/debts/entity/repayment.entity';
import { Asset } from './entity/asset.entity';
import { Bill } from '@/bills/entity/bill.entity';
import { BillsService } from '@/bills/bills.service';
import { IconType } from '@/enum/icon-type.enum';
import { UpdateAssetDebtPieDto } from '@/debts/dto/update-asset-debt-pie.dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
    @InjectRepository(Repayment)
    private readonly repaymentsRepository: Repository<Repayment>,
    @InjectRepository(Asset)
    private readonly assetsRepository: Repository<Asset>,
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
    private readonly snowflakeService: SnowflakeService,
    private readonly billsService: BillsService,
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

  // 资产债务饼图数据
  async getAssetDebtPie(userId: string) {
    //检查用户是否存在
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    let asset = await this.assetsRepository.findOne({
      where: {
        user: { id: userId },
      },
    });

    // 如果用户没有资产记录，创建一个默认资产记录
    if (!asset) {
      asset = this.assetsRepository.create({
        user: { id: userId }, // 关联用户
        included_in_bill_calc: true, // 默认参与核算
        calc_debt_for_current_month: true, // 默认计算当前月负债
        balance: 0, // 默认余额为0
      });
      await this.assetsRepository.save(asset);
    }

    // 构造返回数据
    const responseData = {
      // 余额
      balance: 0,
      // 债务
      debt: 0,
    };

    // 是否添加用户账单进入债务计算
    if (asset?.included_in_bill_calc) {
      // 暂存收支
      let totalIncome = 0;
      let totalExpense = 0;
      let netIncome = 0;

      const bills = await this.billsService.findUserBills(userId);

      bills.forEach((bill) => {
        if (bill.type === IconType.INCOME) {
          totalIncome += Number(bill.money);
        } else if (bill.type === IconType.EXPENSE) {
          totalExpense += Number(bill.money);
        }
      });

      // 净收支 = 收入 - 支出
      netIncome = totalIncome - totalExpense;

      if (netIncome > 0) {
        responseData.balance += Number(netIncome);
      } else {
        responseData.debt += Number(netIncome);
      }
    }

    // 获取用户负债情况
    const debts = await this.getDebts(userId);
    //判断用户负债是否选择月负债还是总负债
    if (asset.calc_debt_for_current_month) {
      // 计算当前月负债
      debts.forEach((debt) => {
        if (debt.status === DebtStatusEnum.OWED) {
          responseData.debt += Number(debt.current_month_due);
        }
      });
    } else {
      // 计算总负债
      debts.forEach((debt) => {
        if (debt.status === DebtStatusEnum.OWED) {
          responseData.debt += Number(debt.total_amount);
        }
      });
    }

    if (Number(asset.balance) > 0) {
      responseData.balance += Number(asset.balance);
    }

    return {
      balance: Math.floor(responseData.balance),
      debt: Math.floor(responseData.debt),
    };
  }

  // 修改资产负债饼图数据
  async updateAssetDebtPie(
    userId: string,
    updateAssetDebtPieDto: UpdateAssetDebtPieDto,
  ) {
    //检查用户是否存在
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    const asset = await this.assetsRepository.findOne({
      where: {
        user: { id: userId },
      },
    });
    if (!asset) {
      throw new HttpException('资产不存在', HttpStatus.BAD_REQUEST);
    }

    // 使用解构赋值，只赋值存在的字段
    if (updateAssetDebtPieDto) {
      const { monthly_only, include_bills, balance } = updateAssetDebtPieDto;

      if (monthly_only !== undefined)
        asset.calc_debt_for_current_month = monthly_only;
      if (include_bills !== undefined)
        asset.included_in_bill_calc = include_bills;
      if (balance !== undefined) asset.balance = balance;
    }
    await this.assetsRepository.save(asset);

    return {
      success: true,
      message: '更新成功',
    };
  }
}

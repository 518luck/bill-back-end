import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';

import { Bill } from '@/bills/entity/bill.entity';
import { Icon } from '@/bills/entity/icon';
import {
  CreateBillDto,
  CreateIconDto,
  GetIconTypeDto,
  GetMonthBillsDto,
} from '@/bills/dto';
import { User } from '@/users/entity/user.entity';
import { SnowflakeService } from '@/common/snowflake/snowflake.service';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
    @InjectRepository(Icon)
    private readonly categoriesRepository: Repository<Icon>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly snowflakeService: SnowflakeService,
  ) {}

  // 获取icon图标(购物,工资...)
  async getIconTypes(getIconTypeDto: GetIconTypeDto, userId: string) {
    const { type } = getIconTypeDto;
    return this.categoriesRepository.find({
      where: [
        { user_id: '0', type },
        { user_id: userId, type },
      ],
    });
  }

  // 创建账单
  async createBill(createBillDto: CreateBillDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: createBillDto.user_id,
      },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const bill = this.billsRepository.create({
      ...createBillDto,
      id: this.snowflakeService.generate(),
      user,
      date: createBillDto.date ? new Date(createBillDto.date) : new Date(),
    });

    await this.billsRepository.save(bill);

    return {
      success: true,
      message: '小账童记住啦',
    };
  }

  // 删除账单
  async deleteBill(id: string, userId: string) {
    const bill = await this.billsRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (!bill) {
      throw new HttpException('账单不存在', HttpStatus.BAD_REQUEST);
    }

    if (bill.user.id !== userId) {
      throw new HttpException('无权删除此账单', HttpStatus.FORBIDDEN);
    }

    await this.billsRepository.delete(id);
    return {
      success: true,
      message: '这笔消费已经被划掉啦',
    };
  }

  // 创建icon(购物,工资...)
  async createIcon(createIconDto: CreateIconDto, isAdmin: boolean = false) {
    const icon = this.categoriesRepository.create({
      id: this.snowflakeService.generate(),
      ...createIconDto,
      user_id: isAdmin ? '0' : createIconDto.user_id,
    });

    const exists = await this.categoriesRepository.findOne({
      where: {
        title: icon.title,
        icon_name: icon.icon_name,
        user_id: icon.user_id,
        type: icon.type,
      },
    });

    if (exists) {
      throw new HttpException('icon已存在', HttpStatus.BAD_REQUEST);
    }

    await this.categoriesRepository.save(icon);

    return {
      success: true,
      message: 'icon创建成功',
    };
  }

  // 获取当月账单
  async getMonthBills(getMonthBillsDto: GetMonthBillsDto, user_id: string) {
    const { date_str, payday } = getMonthBillsDto;
    const base = dayjs(date_str);

    let start: dayjs.Dayjs;
    let end: dayjs.Dayjs;

    if (payday) {
      if (base.date() < payday) {
        start = base.subtract(1, 'month').date(payday);
        end = base.date(payday);
      } else {
        start = base.date(payday);
        end = base.add(1, 'month').date(payday);
      }
    } else {
      start = base.startOf('month');
      end = base.endOf('month');
    }
    // 当月开始时间
    const startOfMonth = start.toDate();
    // 当月结束时间
    const endOfMonth = end.toDate();

    const monthBills = await this.billsRepository.find({
      where: {
        user: { id: user_id },
        date: Between(startOfMonth, endOfMonth),
      },
      order: {
        date: 'DESC',
      },
    });

    const grouped: Record<string, Bill[]> = {};

    monthBills.forEach((bill) => {
      const date = dayjs(bill.date).format('YYYY-MM-DD');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(bill);
    });

    const result = Object.entries(grouped).map(([day, bills]) => ({
      day,
      bills,
    }));

    return result;
  }

  // 删除自定义的图标
  async deleteIcon(id: string, userId: string) {
    const icon = await this.categoriesRepository.findOne({
      where: {
        id,
      },
    });
    if (!icon) {
      throw new HttpException('图标不存在', HttpStatus.BAD_REQUEST);
    }

    if (icon.user_id !== userId) {
      throw new HttpException('无权删除此图标', HttpStatus.FORBIDDEN);
    }

    await this.categoriesRepository.delete(id);
    return {
      success: true,
      message: '图标删除成功',
    };
  }
}

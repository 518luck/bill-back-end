import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';
import { Icon } from '@/bills/entity/icon';
import { CreateBillDto, CreateIconDto, GetIconTypeDto } from '@/bills/dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
    @InjectRepository(Icon)
    private readonly categoriesRepository: Repository<Icon>,
  ) {}

  // 获取分类图标(购物,工资...)
  async getIconTypes(getIconTypeDto: GetIconTypeDto) {
    const { type } = getIconTypeDto;
    return this.categoriesRepository.find({
      where: [
        { user_id: '0', type },
        { user_id: getIconTypeDto.user_id, type },
      ],
    });
  }

  // 创建账单
  createBill(createBillDto: CreateBillDto) {
    const bill = this.billsRepository.create({
      ...createBillDto,
      // user_id: userId,
    });
    return this.billsRepository.save(bill);
  }

  // 创建分类(购物,工资...)
  async createIcon(createCategoryDto: CreateIconDto, isAdmin: boolean = false) {
    console.log(
      '🚀 ~ BillsService ~ createIcon ~ createCategoryDto:',
      createCategoryDto,
    );
    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      user_id: isAdmin ? '0' : createCategoryDto.user_id,
    });

    const exists = await this.categoriesRepository.findOne({
      where: {
        title: category.title,
        icon_name: category.icon_name,
        user_id: category.user_id,
        type: category.type,
      },
    });

    if (exists) {
      throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST);
    }

    await this.categoriesRepository.save(category);

    return {
      success: true,
      message: '分类创建成功',
    };
  }
}

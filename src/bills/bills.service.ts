import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';
import { Category } from '@/bills/entity/category.entity';
import {
  CreateBillDto,
  CreateCategoryDto,
  GetCategoryTypeDto,
} from '@/bills/dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  // 获取消费类型
  getCategoryTypes(getCategoryTypeDto: GetCategoryTypeDto) {
    const { userId, type } = getCategoryTypeDto;
    return this.categoriesRepository.find({
      where: [
        { user_id: '0', type },
        { user_id: userId, type },
      ],
    });
  }

  // 创建账单
  createBill(createBillDto: CreateBillDto) {
    const bill = this.billsRepository.create(createBillDto);
    return this.billsRepository.save(bill);
  }

  // 创建分类(购物,工资...)
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      user_id: createCategoryDto.user_id ?? '0', //不传递就是默认系统分类
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
    return this.categoriesRepository.save(category);
  }
}
